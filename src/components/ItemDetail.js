import React, { Component } from 'react'
import { db } from '../auth/Config'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleChange } from '../store/actions/promoCodeActions'

class ItemDetail extends Component {

    state = {
        item: null,
        disablePromoButton: false,
        promo_value: 0
    }

    getItem() {
        const pack_alias = this.props.match.params.pack_alias
        db.ref(`/items/${pack_alias}`).on('value', snapshot => {
            const data = snapshot.val()
            this.setState({
                item: data
            })
        })
    }

    GST() {
        return this.state.item.pack_price / 100 * 7
    }

    subTotal() {
        return this.state.item.pack_price - this.state.promo_value - this.state.item.pack_price / 100 * 7
    }

    promoChange = e => {
        this.props.handleChange(e)
    }

    promoCode() {
        if(this.props.promoCode === 'SXUIGMOGSWQ') {
            this.setState(
                { promo_value: 10 },
                function() {
                    this.setState({
                        disablePromoButton: true
                    })
                }
            )
        }
    }

    payNow() {
        document.getElementById('payNow').style.left = "0%"
    }

    componentDidMount() {
        this.getItem()
        window.scrollTo(0,0)
    }

    render() {

        const item = this.state.item
        const promo_value = this.state.promo_value

        return (
            <div
                className="container-fluid bg-light p-4"
            >
                {
                    item ? (
                        <div key={item.pack_id}>
                            <h3
                                className="text-uppercase text-secondary font-weight-light mb-4"
                                style={{
                                    letterSpacing: '1px'
                                }}
                            >
                                Class pack purchase preview
                            </h3>

                            <div 
                                className="bg-white shadow-sm"
                            >
                                <div
                                    className="p-5 border-bottom"
                                >
                                    <h4
                                        className="mb-5"
                                    >
                                        You have selected:
                                    </h4>

                                    <div 
                                        className="d-table w-100"
                                    >
                                        <div
                                            className="float-left d-inline-block rounded-circle text-white font-weight-normal mb-4"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                border: '1px solid #53939a',
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            <div 
                                                className="d-table w-100 h-100"
                                            >
                                                <div 
                                                    className="d-table-cell align-middle"
                                                >
                                                    <div
                                                        className="rounded-circle d-flex justify-content-center align-items-center mx-auto"
                                                        style={{
                                                            width: '44px',
                                                            height: '44px',
                                                            background: '#53939a'
                                                        }}
                                                    >
                                                        {item.total_credit}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="float-left ml-4"
                                        >
                                            <h2
                                                className="mb-1"
                                                style={{
                                                    color: '#53939a',
                                                    fontSize: '20px',
                                                    letterSpacing: '-1px'
                                                }}
                                            >
                                                {item.pack_name}
                                            </h2>
                                            <small
                                                className="text-secondary"
                                            >
                                                {item.newbie_note}
                                            </small>
                                        </div>
                                        <div
                                            className="float-right"
                                        >
                                            <h4
                                                className="font-weight-bold mb-2"
                                            >
                                                ${item.pack_price}
                                            </h4>
                                        </div>
                                    </div>

                                    <div
                                        className="col-12 col-lg-6 px-0 pt-5"
                                    >
                                        <div 
                                            className="input-group"
                                        >
                                            <input 
                                                type="text" 
                                                className="form-control p-3 rounded-0 border-0 bg-light shadow-none" 
                                                style={{
                                                    height: '50px'
                                                }}
                                                placeholder="Promo Code" 
                                                value={this.props.promoCode}
                                                onChange={this.promoChange.bind(this)}
                                            />
                                            <div 
                                                className="input-group-append"
                                            >
                                                <span 
                                                    className="input-group-text text-uppercase py-3 px-5 border-0 rounded-0 text-white" 
                                                    onClick={this.promoCode.bind(this)}
                                                    style={{
                                                        background: '#00c3cf',
                                                        height: '50px'
                                                    }}
                                                >
                                                    Apply
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div
                                    className="p-5"
                                >
                                    <div
                                        className="d-flex"
                                    >
                                        <h5
                                            className="text-secondary"
                                        >
                                            Subtotal
                                        </h5>
                                        <h6 
                                            className="ml-auto text-secondary"
                                        >
                                            ${this.subTotal()}
                                        </h6>
                                    </div>
                                    <div
                                        className="d-flex"
                                    >
                                        <h5
                                            className="text-secondary"
                                        >
                                            GST
                                        </h5>
                                        <h6 
                                            className="ml-auto text-secondary"
                                        >
                                            ${this.GST()}
                                        </h6>
                                    </div>

                                    <div
                                        className="d-flex"
                                    >
                                        <h5
                                            className="text-dark"
                                        >
                                            Discount
                                        </h5>
                                        <h6 
                                            className="ml-auto text-dark"
                                        >
                                            ${promo_value}
                                        </h6>
                                    </div>

                                    <div
                                        className="d-flex"
                                    >
                                        <h5
                                            className="text-secondary"
                                        >
                                            Grand Total
                                        </h5>
                                        <h6 
                                            className="ml-auto text-secondary"
                                        >
                                            ${item.pack_price}
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            <p className="m-0 pt-5 pb-3 text-secondary">Please read all <a href="!#" rel="noopener noreferrer" className="text-decoration-none text-dark">Terms & Conditions</a> before purchasing your YM class or class pack.</p>

                            <div
                                className="d-flex"
                            >
                                <div className="align-self-center">
                                    <Link 
                                        to="/" 
                                        className="text-decoration-none text-dark"
                                        style={{
                                            fontSize: '50px'
                                        }}
                                    >&#8592;</Link>
                                </div>
                                <div className="align-self-center ml-auto">
                                    <button
                                        className="shadow-none btn text-uppercase text-white rounded-pill border-0 py-3 font-weight-bold"
                                        style={{
                                            background: '#00c3cf',
                                            paddingLeft: '5rem',
                                            paddingRight: '5rem'
                                        }}
                                        onClick={this.payNow}
                                    >Pay now</button>
                                </div>
                            </div>

                            <div
                                id="payNow"
                                className="position-fixed h-100"
                                style={{
                                    left: '100%',
                                    top: '0',
                                    right: '0',
                                    bottom: '0',
                                    zIndex: '99999'
                                }}
                            >

                                <div
                                    className="container-fluid bg-light px-4 d-table h-100"
                                >
                                    <div
                                        className="d-table-cell align-middle"
                                    >
                                        <h3
                                            className="text-uppercase text-secondary font-weight-light mb-4 thank-wrap"
                                            style={{
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            Thank you ! You have successfully purchased a class pack!
                                        </h3>

                                        <div 
                                            className="bg-white shadow-sm"
                                        >
                                            <div
                                                className="p-5 border-bottom"
                                            >
                                                <h4
                                                    className="mb-5"
                                                >
                                                    You have selected:
                                                </h4>

                                                <div 
                                                    className="d-table w-100"
                                                >
                                                    <div
                                                        className="float-left d-inline-block rounded-circle text-white font-weight-normal mb-4"
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            border: '1px solid #53939a',
                                                            letterSpacing: '1px'
                                                        }}
                                                    >
                                                        <div 
                                                            className="d-table w-100 h-100"
                                                        >
                                                            <div 
                                                                className="d-table-cell align-middle"
                                                            >
                                                                <div
                                                                    className="rounded-circle d-flex justify-content-center align-items-center mx-auto"
                                                                    style={{
                                                                        width: '44px',
                                                                        height: '44px',
                                                                        background: '#53939a'
                                                                    }}
                                                                >
                                                                    {item.total_credit}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="float-left ml-4"
                                                    >
                                                        <h2
                                                            className="mb-1"
                                                            style={{
                                                                color: '#53939a',
                                                                fontSize: '20px',
                                                                letterSpacing: '-1px'
                                                            }}
                                                        >
                                                            {item.pack_name}
                                                        </h2>
                                                        <small
                                                            className="text-secondary"
                                                        >
                                                            {item.newbie_note}
                                                        </small>
                                                    </div>
                                                    <div
                                                        className="float-right"
                                                    >
                                                        <h4
                                                            className="font-weight-bold mb-2"
                                                        >
                                                            ${item.pack_price}
                                                        </h4>
                                                    </div>
                                                </div>

                                            </div>

                                            <div
                                                className="p-5"
                                            >
                                                <div
                                                    className="d-flex"
                                                >
                                                    <h5
                                                        className="text-secondary"
                                                    >
                                                        Subtotal
                                                    </h5>
                                                    <h6 
                                                        className="ml-auto text-secondary"
                                                    >
                                                        ${this.subTotal()}
                                                    </h6>
                                                </div>
                                                <div
                                                    className="d-flex"
                                                >
                                                    <h5
                                                        className="text-secondary"
                                                    >
                                                        GST
                                                    </h5>
                                                    <h6 
                                                        className="ml-auto text-secondary"
                                                    >
                                                        ${this.GST()}
                                                    </h6>
                                                </div>

                                                <div
                                                    className="d-flex"
                                                >
                                                    <h5
                                                        className="text-dark"
                                                    >
                                                        Discount
                                                    </h5>
                                                    <h6 
                                                        className="ml-auto text-dark"
                                                    >
                                                        ${promo_value}
                                                    </h6>
                                                </div>

                                                <div
                                                    className="d-flex"
                                                >
                                                    <h5
                                                        className="text-secondary"
                                                    >
                                                        Grand Total
                                                    </h5>
                                                    <h6 
                                                        className="ml-auto text-secondary"
                                                    >
                                                        ${item.pack_price}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="d-flex"
                                        >
                                            <div className="align-self-center">
                                                <Link 
                                                    to="/" 
                                                    className="text-decoration-none text-dark"
                                                    style={{
                                                        fontSize: '50px'
                                                    }}
                                                >&#8592;</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    promoCode: state.promoCode.value
})

export default connect(
    mapStateToProps, { handleChange }
)(ItemDetail)