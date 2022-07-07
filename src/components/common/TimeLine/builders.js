import {
    START_YEAR,
    NUM_OF_YEARS,
    MONTH_NAMES,
    MONTHS_PER_YEAR,
    QUARTERS_PER_YEAR,
    MONTHS_PER_QUARTER,
    NUM_OF_MONTHS,
    MAX_TRACK_START_GAP,
    MAX_ELEMENT_GAP,
    MAX_MONTH_SPAN,
    MIN_MONTH_SPAN,
    MAX_NUM_OF_SUBTRACKS,
  } from './constants'
  
  import { fill, hexToRgb, colourIsLight, addMonthsToYear, addMonthsToYearAsDate, nextColor, randomTitle } from './utils'
  
  // 상단 분기 컬럼 생성
  export const buildQuarterCells = () => {
    const v = []
    for (let i = 0; i < QUARTERS_PER_YEAR * NUM_OF_YEARS; i += 1) {
      const quarter = (i % 4) + 1
      const startMonth = i * MONTHS_PER_QUARTER
      const s = addMonthsToYear(START_YEAR, startMonth)
      const e = addMonthsToYear(START_YEAR, startMonth + MONTHS_PER_QUARTER)
      v.push({
        id: `${s.year}-q${quarter}`,
        title: `Q${quarter} ${s.year}`,
        start: new Date(`${s.year}-${s.month}-01`),
        end: new Date(`${e.year}-${e.month}-01`),
      })
    }
    return v
  }
  
  // 상단 월 컬럼 생성
  export const buildMonthCells = () => {
    const v = []
    for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
      const startMonth = i
      const start = addMonthsToYearAsDate(START_YEAR, startMonth)
      const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1)
      v.push({
        id: `m${startMonth}`,
        title: MONTH_NAMES[i % 12],
        start,
        end,
      })
    }
    return v
  }
  
  // 상단 컬럼 종류
  export const buildTimebar = () => [
    {
      id: 'quarters',
      title: '분기',
      cells: buildQuarterCells(),
      style: {},
    },
    {
      id: 'months',
      title: '월',
      cells: buildMonthCells(),
      useAsGrid: true,
      style: {},
    },
  ]
  
  // 요소 생성
  export const buildElement = ({ trackId, start, end, i }) => {
    const bgColor = nextColor()
    const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff'
    return {
      id: `t-${trackId}-el-${i}`,
      title: randomTitle(),
      start,
      end,
      style: {
        backgroundColor: `#${bgColor}`,
        color,
        borderRadius: '4px',
        boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
        textTransform: 'capitalize',
      },
    }
  }
  
  export const buildTrackStartGap = () => Math.floor(Math.random() * MAX_TRACK_START_GAP)
  export const buildElementGap = () => Math.floor(Math.random() * MAX_ELEMENT_GAP)
  
  // 요소 전체 생성
  export const buildElements = trackId => {
    const v = []
    let i = 1
    // 시작일
    let month = buildTrackStartGap()
  
    while (month < NUM_OF_MONTHS) {
      let monthSpan = Math.floor(Math.random() * (MAX_MONTH_SPAN - (MIN_MONTH_SPAN - 1))) + MIN_MONTH_SPAN
  
      if (month + monthSpan > NUM_OF_MONTHS) {
        monthSpan = NUM_OF_MONTHS - month
      }
  
      const start = addMonthsToYearAsDate(START_YEAR, month)
      const end = addMonthsToYearAsDate(START_YEAR, month + monthSpan)
      v.push(
        buildElement({
          trackId,
          start,
          end,
          i,
        })
      )
      const gap = buildElementGap()
      month += monthSpan + gap
      i += 1
    }
  
    return v
  }
  
  // 좌측 서브 컬럼 목록 생성
  export const buildSubtrack = (trackId, subtrackId) => ({
    id: `track-${trackId}-${subtrackId}`,
    title: `Subtrack ${subtrackId}`,
    elements: buildElements(subtrackId),
  })
  
  // 좌측 메인 컬럼 목록 생성
  export const buildTrack = trackId => {
    const tracks = fill(
      // 랜덤 서브 컬럼 개수 생성
      Math.floor(Math.random() * MAX_NUM_OF_SUBTRACKS) + 1
      )
      // 개수만큼 서브 컬럼 생성
      .map(i => buildSubtrack(trackId, i + 1))



    return {
      id: `track-${trackId}`,
      title: `Track ${trackId}`,
      elements: buildElements(trackId),
      // tracks,                        // 서브 컬럼 목록
      // hasButton: false,                 // 메인 컬럼 우측 버튼
      // link: 'www.google.com',
      // isOpen: false,                 // 메인 컬럼 펼치기 버튼
    }
  }