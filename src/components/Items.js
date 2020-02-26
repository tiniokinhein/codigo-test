import React, { Component } from 'react'
import IBG from '../assets/img/item-bg.jpg'
import { Link } from 'react-router-dom'
import { db , auth } from '../auth/Config'
import Skeleton from 'react-loading-skeleton'

export default class Items extends Component {

    state = {
        items: []
    }

    getItems = () => {
        db.ref('/items').orderByChild('disp_order').on('value', snapshot => {
            let allItems = []
            snapshot.forEach(snap => {
                allItems.push(snap.val())
            })
            this.setState({
                items: allItems
            })
        })
    }

    componentDidMount() {
        this.getItems()
        window.scrollTo(0,0)
    }

    render() {

        const items = this.state.items

        const itemLists = items.length ? (
            <>
                {
                    items.map((item) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 overflow-hidden"
                            key={item.pack_id}
                            style={{
                                border: '1px solid #f1f1f1',
                                borderTop: '0',
                                borderRight: '0'
                            }}
                        >
                            <div
                                className="position-absolute bg-pic"
                            >
                                <img
                                    src={IBG}
                                    alt=""
                                />
                            </div>

                            <Link 
                                to={`/item/${item.pack_alias}`}
                                className="text-decoration-none text-dark"
                            >
                                <div
                                    className="py-4 px-3"
                                >
                                    {
                                        item.tag_name ? (
                                            <small
                                                className="text-uppercase font-weight-light d-inline-block m-0 py-1 px-5 text-white"
                                                style={{
                                                    background: '#000'
                                                }}
                                            >
                                                {item.tag_name}
                                            </small>
                                        ) : (
                                            <div
                                                style={{
                                                    height: '27px'
                                                }}
                                            />
                                        )
                                    }
                                    <div
                                        className="text-center mt-4"
                                    >
                                        <h2
                                            className="mb-4"
                                            style={{
                                                color: '#53939a',
                                                fontSize: '20px',
                                                letterSpacing: '-1px'
                                            }}
                                        >
                                            {item.pack_name}
                                        </h2>
                                        <div
                                            className="d-inline-block rounded-circle text-white font-weight-normal mb-4"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                border: '1px solid #53939a',
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            <div className="d-table w-100 h-100">
                                                <div className="d-table-cell align-middle">
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
                                            className="mb-5"
                                        >
                                            {
                                                item.newbie_note &&
                                                <p
                                                    className="text-secondary"
                                                    dangerouslySetInnerHTML={{__html: item.newbie_note}}
                                                />
                                            }
                                        </div>
                                        <h4
                                            className="font-weight-bold mb-2"
                                        >
                                            ${item.pack_price}
                                        </h4>
                                        <small
                                            className="text-secondary"
                                        >
                                            ${item.estimate_price} per class !
                                        </small>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </>
        ) : (
            <>
                <div className="col-12 col-sm-6 col-md-4 px-0">
                    <Skeleton height={360} />
                </div>
                <div className="col-12 col-sm-6 col-md-4 px-0">
                    <Skeleton height={360} />
                </div>
                <div className="col-12 col-sm-6 col-md-4 px-0">
                    <Skeleton height={360} />
                </div>
                <div className="col-12 col-sm-6 col-md-4 px-0">
                    <Skeleton height={360} />
                </div>
                <div className="col-12 col-sm-6 col-md-4 px-0">
                    <Skeleton height={360} />
                </div>
                <div className="col-12 col-sm-6 col-md-4 px-0">
                    <Skeleton height={360} />
                </div>
            </>
        )

        return (
            <div
                className="container-fluid"
            >
                <div 
                    className="row"
                >
                    {itemLists}

                </div>

                {
                    auth.currentUser ? (
                        <button
                            className="btn btn-dark position-fixed rounded-circle border-0 font-weight-bold"
                            style={{
                                right: '15px',
                                bottom: '15px',
                                width: '60px',
                                height: '60px',
                                fontSize: '12px'
                            }}
                            onClick={() => auth.signOut()}
                        >Logout</button>
                    ) : null
                }
                
            </div>
        )

    }
}
