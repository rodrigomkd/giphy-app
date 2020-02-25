import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";

class ModalComponent extends Component {

    constructor(props) {
        super(props);
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        const { title, image, id, url, importDatetime, trendingDatetime, show } = this.props;

        return (
            <Modal {...this.props}>
                <Modal.Header closeButton onClick={this.props.onClose}>
                    <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    {image ? (
                        <Card.Img variant="top" src={image} />
                    ) : (<label></label>)}

                    <Card.Body>
                        <Card.Text>
                            <b>ID: </b> {id}
                                <br />
                                <b>URL: </b><a target="_blank" href={url}>{url}</a>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        Import Datetime: {importDatetime}
                        <br />
                        Trending Datetime: {trendingDatetime}
                    </Card.Footer>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>       
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    importDatetime: PropTypes.string,
    trendingDatetime: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalComponent;