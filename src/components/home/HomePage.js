import React from 'react';

//Bootstrap components
import { Form, Container, Col, CardGroup, Card, Button, Row } from 'react-bootstrap';

//Components
import Pagination from './../pagination/Pagination';
import Modal from './ModalComponent';

//API
import API from './../../services/api';

const styleSelectBox = {
    width: 80
};
const items = [10, 20, 30, 50, 100];
const API_KEY = process.env.API_KEY;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        

        this.state = {
            search: null,
            show: false,
            image: {},
            images: [],
            pages: [],
            limit: 10,
            offset: 0,
            resultsCount: null,
            currentPage: null,
            totalPages: 0,
            refresh: false
        };
        /*
        let image = {};
        image.title = null;
        image.image = null;
        image.id = null;
        image.url = null;
        image.importDatetime = null;
        image.trendingDatetime = null;
        this.setState({ image });
        */
    }

    async retrieveImages(offset, limit, search) {
        this.setState({ "images": [] });

        const res = await API.get(`search?api_key=${API_KEY}&offset=${offset}&limit=${limit}&q=${search}`);

        const images = res.data.data;
        this.setState({ images });
        this.setState({ "resultsCount": res.data.pagination.total_count });
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
        if (name == 'limit') {
            const limit = Number(value);
            const offset = 0;
            this.setState({ limit, offset });
            this.retrieveImages(offset, limit, this.state.search);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const refresh = true;
        const offset = 0;
        this.setState({ refresh, offset });
        this.retrieveImages(this.state.offset, this.state.limit, this.state.search);
    }

    onPageChanged = data => {
        const { currentPage, totalPages } = data;
        const offset = currentPage - 1;

        this.setState({ currentPage, totalPages, offset });

        if (this.state.refresh) {
            this.retrieveImages(offset, this.state.limit, this.state.search);
        }      
    }

    showModal = e => {
        this.setState({
            show: false
        });
    };

    setImage(img) {
        let image = {};
        image.title = img.title;
        image.image = img.images.downsized_large.url;
        image.id = img.id;
        image.url = img.url;
        image.importDatetime = img.import_datetime;
        image.trendingDatetime = img.trending_datetime;

        this.setState({ show: true, image: image })
    }

    render() {
        const {
            images,
            currentPage,
            totalPages,
            resultsCount,
            image
        } = this.state;

        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ].join(" ").trim();

        return (
            <div>
                <div class="jumbotron">                               
                    <Form>
                        <label><b>Search: </b></label>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    placeholder="Search"
                                    name="search"
                                    onChange={this.handleInput.bind(this)}
                                />
                            </Col>
                            <Col>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
        </div>

                <Container>
                    <Row>
                        <CardGroup>
                            {this.state.resultsCount > 0 ?
                                (
                                <Row>
                                    <h2 className={headerClass}>
                                        <strong className="text-secondary">{resultsCount}</strong>{" "}
                                        Results
                            </h2>

                                    <h4 className={headerClass}>
                                        <span className="text-secondary">
                                                &nbsp;&nbsp;{"Page "}
                                            {currentPage}{"/"}
                                            {totalPages}
                                        </span>
                                        </h4>                                   
                                    </Row>

                                ) : (<h2 className={headerClass}>
                                    <strong className="text-secondary">{resultsCount}</strong>{" "}
                                    No Results
                            </h2>)

                            }

                                <Row>
                                {images.map((image, index) =>
                                    <Card
                                        key={index} style={{ width: '18rem' }}
                                        onClick={this.setImage.bind(this, image)}>
                                        <Card.Img variant="top" src={image.images.downsized_medium.url} />
                                    </Card>
                                    )}    
                                    </Row>
                            </CardGroup>
                        <Row>
                            {resultsCount > 0 ? (
                                <select
                                    name="limit"
                                    style={styleSelectBox}
                                    className="form-control"
                                    value={this.state.limit}
                                    onChange={this.handleInput.bind(this)}>
                                    <option></option>
                                    {items.map((value, index) =>
                                        <option key={index} value={value}>{value}</option>
                                    )}
                                </select>
                            ): (<span></span>)}
                            

                            <Pagination
                                totalRecords={resultsCount}
                                pageLimit={this.state.limit}
                                pageNeighbours={10}
                                onPageChanged={this.onPageChanged}
                            />
                        </Row>                                            
                    </Row>
                </Container>

                    <Modal
                        title={image.title}
                        image={image.image}
                        id={image.id}
                        url={image.url}
                        importDatetime={image.importDatetime}
                        trendingDatetime={image.trendingDatetime}
                        show={this.state.show}
                        onClose={this.showModal}
                    />              
  </div>  
        );
    }
}

export { HomePage };