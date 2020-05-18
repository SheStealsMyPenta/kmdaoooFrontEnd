import React, { Component } from 'react'
import Tags from './TagsComponent'


export default class TagsContainer extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     tags: [{ name: "uhf", checked: false }, { name: "ae", checked: false }, { name: "tev", checked: false }, { name: "hfct", checked: false }]
        // }
    }

    render() {
        return (
            <div>
                {

                    this.props.tags.map((item, index) => {

                        return (
                            <Tags key={index} style={{ marginTop: 5 }} handlechange={this.props.handlechange} index={index} checked={item.checked}> {item.name} </Tags>
                        )

                    })
                }
                {/* <Tags handleChange={this.props.handleChange} index={1} checked={this.props.tags[1].checked}>  AE  </Tags>
                <Tags handleChange={this.props.handleChange} index={2} checked={this.props.tags[2].checked}>  TEV    </Tags>
                <Tags handleChange={this.props.handleChange} index={3} checked={this.props.tags[3].checked}>  HFCT  </Tags>
                <Tags handleChange={this.props.handleChange} index={4} checked={this.props.tags[4].checked}>  AA  </Tags> */}
            </div>
        )
    }
}
