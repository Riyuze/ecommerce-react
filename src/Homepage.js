import axios from 'axios';
import React from 'react';
import Cart from './Cart';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "Homepage",
            item: "",
            items: [],
            items_filtered: [],
            cart: [],
        }
    }

    componentDidMount() {
        axios.get('https://online.akomate.com/atma/api/products').then(res => {
            this.setState({
                items: res.data
            })
        })
    }

    changePage = (newPage) => {
        this.setState({ page: newPage })
    }

    logout = () => {
        this.props.changePage("Login");
    }

    findItems = () => {
        this.setState({ items_filtered: this.state.items.filter(x => x.name.toLowerCase().includes(this.state.item.toLowerCase())) });
    }

    cart = () => {
        this.changePage("Cart");
    }

    addToCart = (item, amount) => {
        if (this.state.cart.find(cart => (cart.item === item))) {
            this.setState({
                cart: this.state.cart.map((i) => {
                    if (i.item === item) {
                        i.amount += amount
                        return i
                    }
                    else {
                        return i
                    }
                })
            })
        }
        else {
            this.setState({ cart: this.state.cart.concat({ item, amount }) })
        }
    }

    render() {
        return (
            this.state.page === "Cart" ?
            <Cart changePage={this.changePage} cart={this.state.cart} /> :
            <div className="Homepage">
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand>Reacto E-Commerce</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Button variant="info me-2" onClick={this.cart}>Cart</Button>
                            <Button variant="warning ms-2" onClick={this.logout}>Logout</Button>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={this.state.item}
                            onChange={e => this.setState({ item: e.target.value, items_filtered: [] })} 
                            />
                            <Button variant="success" onClick={this.findItems}>Search</Button>
                        </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
            </div>
        );
    }
}

export default Homepage;
