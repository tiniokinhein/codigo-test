import React, { Component } from 'react'


const Items = React.lazy(() => import('../components/Items'))

export default class Home extends Component {

    render() {

        return (
            <React.Suspense
                fallback={
                    <div
                        className="position-fixed bg-white"
                        style={{
                            left: '0',
                            top: '0',
                            right: '0',
                            bottom: '0',
                            zIndex: '999',
                            fontSize: '2rem'
                        }}
                    >
                        <div
                            className="text-center d-table w-100 h-100 px-5"
                        >
                            <div
                                className="d-table-cell align-middle font-lora font-weight-400 text-uppercase"
                            >
                                Loading ...
                            </div>
                        </div>
                    </div>
                }
            >
                <Items />
            </React.Suspense>
        )
    }
}
