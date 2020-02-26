import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <>
                <div
                    className="bg-dark"
                >
                    <div 
                        className="container"
                        style={{
                            height: '100vh',
                            minHeight: '600px'
                        }}
                    >
                        <h2 className="h-100 font-700 d-flex align-items-center justify-content-center text-white">
                            The page, you are looking for, is not found.
                        </h2>
                    </div>
                </div>
            </>
        )
    }
}
