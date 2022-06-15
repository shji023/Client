import React, {Component} from 'react';
// import './App.css';
import {
    ButtonGroup,
    // Button,
    Col,
    Container,
    FormGroup,
    Input,
    // Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';
import restClient from "./restClient";
// import MetadataListView from "./MetadataListView";
import styled from "styled-components";
import { colors } from "assets/styles/color";

const pageSize = 10;
const initMetaDataPaged = {
    content: [],
    totalSize: 0,
    page: 0
};

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: "",
            title: "",
            details: "",
            error: "",
            metaDataPaged: initMetaDataPaged,
            modalMessage: "",
            modal: false,
            blocking: false
        }
    }

    componentDidMount() {
        this.fetchMetadata(0, pageSize);
    }

    setStateAsync = (state) => {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    };

    toggleErrorAsync = async (error) => await this.toggleModalAsync(error);

    toggleModalAsync = async (message) => {
        await this.setStateAsync((state) => ({
            blocking: !state.blocking,
            modal: !state.modal,
            modalMessage: state.modal ? "" : message
        }));
    };

    //////////////////////// operations on test data with rest client //////////////////////////////
    fetchMetadata = async (page, sizePerPage, sortOrder) => {
        try {
            const sort = sortOrder || "asc";
            const response = await restClient.fetchAll(page, pageSize, sort);
            const metaDataPaged = {};
            metaDataPaged.content = response.content;
            metaDataPaged.totalSize = response.totalElements;
            metaDataPaged.page = page + 1;// rest api pages are 0-indexed while this component is 1-based indexed
            metaDataPaged.sizePerPage = sizePerPage;
            metaDataPaged.sortOrder = sort;
            await this.setStateAsync({metaDataPaged: metaDataPaged});
            return metaDataPaged;
        } catch (error) {
            await this.toggleErrorAsync("Cannot fetch tests");
        }
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'file' ? event.target.files[0] : target.value;
        const name = target.name;
        this.setState({
            [name]: value, error: ""
        });
    };

    onUpload = async () => {
        console.log("upload 버튼 클릭");
        try {
            const result = await restClient.uploadFile(this.state.file, this.state.title, this.state.details)
            if (!result) this.displayTheError('No user found');
        } catch (e) {
            await this.toggleErrorAsync(e.message);
            return;
        }
        await this.fetchMetadata(0, pageSize);
    }

    getMetadataColumns = () => {
        const keysArr = this.state.metaDataPaged.content.map(e => Object.keys(e));
        const keys = keysArr.length > 0 ? keysArr[0] : [];
        const headerParams = keys.map(k => {
            return {fieldName: k, columnName: k};
        });
        if (headerParams.length > 0) {
            // key attribute is required on one column
            headerParams[0].isKey = true;
        }
        return headerParams;
    };


    render() {
        return (
            <>
                <ButtonWrapper>
                <SubTitle>RFQ 첨부 (공급사 배포)</SubTitle>
                <Button
                    disabled={this.state.title === "" || this.state.file === "" || this.state.details === ""}
                    // color="primary" size="md"
                    onClick={this.onUpload}>Upload</Button>
                </ButtonWrapper>
                <section>
                    <UploadContainer>
                    <Label htmlFor="check">선택</Label>
                    <Label htmlFor="type">유형</Label>
                    <Label htmlFor="file">첨부</Label>
                    <Label htmlFor="title">첨부 파일명</Label>
                    <Label htmlFor="size">Size</Label>
                    <Label htmlFor="createDate">등록일</Label>
                    <p>체크박스 표시</p>
                    <p>유형 선택</p>
                    <InputFile type="file" name="file" id="file"
                        placeholder="Select a file for upload"
                        onChange={this.handleInputChange}
                        valid={true}/>
                    <InputFile type="text" name="title" id="title"
                        placeholder="변경할 파일 이름을 입력하세요"
                        onChange={this.handleInputChange}
                        valid={true}/>
                    <p>사이즈 자동으로 등록</p>
                    <p>등록일 자동으로 등록</p>
                </UploadContainer>  
                {/* <MetadataListView columns={this.getMetadataColumns()}
                    fetchData={this.fetchMetadata}
                    data={this.state.metaDataPaged.content
                        ? this.state.metaDataPaged.content
                        : []}
                    totalSize={this.state.metaDataPaged.totalSize}
                    page={this.state.metaDataPaged.page}
                    sizePerPage={this.state.metaDataPaged.sizePerPage}
                /> */}

                {/*Waiting modal*/}
                {/* <Modal isOpen={this.state.blocking} toggle={() => false}
                       className={this.props.className}>
                    <ModalBody>
                        Loading...
                    </ModalBody>
                </Modal> */}

                {/*Error modal*/}
                {/* <Modal isOpen={this.state.modal} className={this.props.className}>
                    <ModalHeader>Error</ModalHeader>
                    <ModalBody>
                        {this.state.modalMessage}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleErrorAsync}>OK</Button>
                    </ModalFooter>
                </Modal> */}

                </section>
            </>

            // <div className="App">
            //     <StyledRoot>
            //         <InputContainer>
            //             <label for="file" sm={3}>첨부</label>
            //             <label for="title" sm={4}>첨부 파일명</label>
            //             <Button
            //                         disabled={this.state.title === "" || this.state.file === "" || this.state.details === ""}
            //                         // color="primary" size="md"
            //                         onClick={this.onUpload}>Upload</Button>

            //             {/* <col sm={4}>
            //                 <input type="file" name="file" id="file"
            //                         placeholder="Select a file for upload"
            //                         onChange={this.handleInputChange}
            //                         valid={true}/>
            //             </col>
            //             <col sm={6}>
            //                 <input type="text" name="title" id="title"
            //                         placeholder="변경할 파일 이름을 입력하세요"
            //                         onChange={this.handleInputChange}
            //                         valid={true}/>
            //             </col> */}
            //         </InputContainer>  
            //     </StyledRoot>

            //     {/*Waiting modal*/}
            //     <Modal isOpen={this.state.blocking} toggle={() => false}
            //            className={this.props.className}>
            //         <ModalBody>
            //             Loading...
            //         </ModalBody>
            //     </Modal>


            //     {/*Error modal*/}
            //     <Modal isOpen={this.state.modal} className={this.props.className}>
            //         <ModalHeader>{/*Error*/}</ModalHeader>
            //         <ModalBody>
            //             {this.state.modalMessage}
            //         </ModalBody>
            //         <ModalFooter>
            //             <Button color="secondary" onClick={this.toggleErrorAsync}>OK</Button>
            //         </ModalFooter>
            //     </Modal>
            // </div>
        );
    }
}

export default Upload;


const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 2rem 2rem 0.5rem;
  gap: 1rem;
`;

const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 1fr 1.5fr 0.5fr 0.5fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 0rem 0.5rem;
  gap: 1rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.7rem;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 1.0rem;
  // margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex; 
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 90%;
  height: 100%;
`;

const Label = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 90%;
  height: 100%;
`;

const InputFile = styled.input`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  // margin-top: 1rem;
  width: 90%;
  height: 100%;
`;