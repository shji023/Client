import React, { Component, useState } from 'react'
import Timeline from 'react-timelines'

import 'react-timelines/lib/css/style.css'

import { START_YEAR, NUM_OF_YEARS, NUM_OF_TRACKS } from './constants'

import { buildTimebar, buildTrack } from './builders'

import { TimeLineBuildStyle, fill } from './utils'
import styled from 'styled-components'
import { useEffect } from 'react'

const now = new Date()

const timebar = buildTimebar()

const MIN_ZOOM = 2
const MAX_ZOOM = 20

function TimeLines ({title, trackData}) {
  // const { open, zoom, tracks } = this.state
  
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(2);
  const start = new Date(`${START_YEAR}`)
  const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)

  // Track Data 샘플
  const tasks = [
    {
      id: "1",
      title: "물품1",
      start: new Date("2021-08-31"),
      end: new Date("2021-09-21"),
      style: TimeLineBuildStyle,
      elements: [
        {
          id: "1",
          title: "물품1",
          start: new Date("2021-08-31"),
          end: new Date("2021-09-21"),
          style: TimeLineBuildStyle,
        }
      ],
    }
  ];

  const tracks = trackData;

  

  // #region 이벤트
  const clickElement = element => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`)

  const handleToggleOpen = () => {
    setOpen(!open);
    // this.setState(({ open }) => ({ open: !open }))
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, MAX_ZOOM));
    // this.setState(({ zoom }) => ({ zoom: Math.min(zoom + 1, MAX_ZOOM) }))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, MIN_ZOOM));
    // this.setState(({ zoom }) => ({ zoom: Math.max(zoom - 1, MIN_ZOOM) }))
  }

  // const handleToggleTrackOpen = track => {
    

  //   this.setState(state => {
  //     const tracksById = {
  //       ...state.tracksById,
  //       [track.id]: {
  //         ...track,
  //         isOpen: !track.isOpen,
  //       },
  //     }

  //     return {
  //       tracksById,
  //       tracks: Object.values(tracksById),
  //     }
  //   })
  // }
  // #endregion 이벤트
  

  useEffect(()=>{
    const element = document.createElement("p");
          element.id = "rtTitle"
          element.textContent = title;
  
    const rtControls = document.getElementsByClassName('rt-controls')[0];
    !document.getElementById(element.id) && rtControls.appendChild(element);
  }, [])

  return (
    <>
      <div style={{ width: "100%", height: "100%", padding: "2rem 0rem" }}>
        <div style={{ width: "100%", /* height: "600px" */ }}>
          <div className="app">
            {/* <h1 className="title">{title}</h1> */}
            <Timeline
              scale={{
                start,
                end,
                zoom,
                zoomMin: MIN_ZOOM,
                zoomMax: MAX_ZOOM,
              }}
              isOpen={open}
              // toggleOpen={handleToggleOpen}
              zoomIn={handleZoomIn}
              zoomOut={handleZoomOut}
              // clickElement={clickElement}
              clickTrackButton={track => {
                // eslint-disable-next-line no-alert
                alert(JSON.stringify(track))
              }}
              timebar={timebar}
              tracks={tracks}
              now={now}
              // toggleTrackOpen={this.handleToggleTrackOpen}
              enableSticky
              scrollToNow
            />
          </div>
        </div>
      </div>
    </>
  )
}

// class TimeLines extends Component {
//   constructor(props) {
//     super(props)

//     // 좌측 메인 컬럼 생성
//     const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
//       const track = buildTrack(i + 1)
//       acc[track.id] = track
//       return acc
//     }, {})

//     this.state = {
//       open: false,
//       zoom: 2,
//       // eslint-disable-next-line react/no-unused-state
//       tracksById,
//       tracks: Object.values(tracksById),
//     }
//   }

  

//   render() {
//     const { open, zoom, tracks } = this.state
//     const start = new Date(`${START_YEAR}`)
//     const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)

//     return (
//       <div className="app">
//         {/* <h1 className="title">React Timelines</h1> */}
//         <Timeline
//           scale={{
//             start,
//             end,
//             zoom,
//             zoomMin: MIN_ZOOM,
//             zoomMax: MAX_ZOOM,
//           }}
//           isOpen={open}
//           toggleOpen={this.handleToggleOpen}
//           zoomIn={this.handleZoomIn}
//           zoomOut={this.handleZoomOut}
//           clickElement={clickElement}
//           clickTrackButton={track => {
//             // eslint-disable-next-line no-alert
//             alert(JSON.stringify(track))
//           }}
//           timebar={timebar}
//           // tracks={tracks}
//           tracks={tasks}
//           now={now}
//           toggleTrackOpen={this.handleToggleTrackOpen}
//           enableSticky
//           scrollToNow
//         />
//       </div>
//     )
//   }
// }

export default TimeLines

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  font-family: "Pretendard-SemiBold";
`;