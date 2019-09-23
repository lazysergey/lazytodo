import React, { PureComponent } from './../../node_modules/react';

export class TodoInput extends PureComponent {
    state = {
        value: ''
    }

    handleOnChange = (e) => {
        // this.props.handleInputChange(e);
        // e.persist()
        // console.log(e.target.value);
        this.setState({ value: e.target.value });
    }
    // handleOnKeyUp = (e) => {
    //     this.props.getInputValue(e.nativeEvent.target.value);
    // }

    addNewTodo = (e) => {
        if (e.nativeEvent.code === "Enter") {
            // const value = e.target.value;
            if (!e.target.value) {
                return;
            }
            this.props.addNewTodo(e.target.value).then(_ => {
                console.log(_);
                this.setState({ value: '' });
            })
            // this.addNewTodo(value);
        }
    }

    render() {
        return <input
            type='text'
            value={this.state.value}
            // onKeyUp={this.handleOnKeyUp}
            onKeyUp={this.addNewTodo}
            onChange={this.handleOnChange}
        />
    }
}
