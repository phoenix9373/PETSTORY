import React, { Component } from 'react';
import axios from 'axios';

export default class MultipleImageUploadComponent extends Component {
    fileObj = [];
    fileArray = [];
    images = [];
    titleRef = React.createRef();
    contextRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            file: [null],
        };
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
        }
        console.log(this.fileArray);
        this.setState({ file: this.fileArray});
    }

    uploadFiles(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.titleRef.current.value);
        formData.append('context', this.contextRef.current.value);
        console.log(this.images);
        for (const image of this.images[0]) {
        formData.append('files', image);
        }
        // console.log(this.state.file);
        axios.post("/api/board/create", formData, {})
        .then(response => console.log(response))
        .then(result => console.log(result))
        .catch(error => console.error('error', error));
        this.titleRef.current.value = '';
        this.contextRef.current.value = '';
    }

    render() {
        return (
            <form onSubmit={this.uploadFiles}>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <img src={url} key={url} width="100px" height="100px" alt="..." />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                        <input ref={this.titleRef} placeholder="제목을 입력하시오" type="text"/>
                        <input ref={this.contextRef} placeholder="내용을 입력하시오" type="text"/>
                </div>
                <button>Upload</button>
            </form >
        );
    }
}
