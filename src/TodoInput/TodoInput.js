import React, { PureComponent } from 'react';
import './TodoInput.scss';

export class TodoInput extends PureComponent {
    isSending = false;
    state = {
        value: ''
    }

    handleOnChange = (e) => {
        this.setState({
            value: e.target.value,
            hasError: false
        });
    }

    handleOnKeyDown = (e) => {
        if (this.isSending) {
            return;
        }
        if (e.nativeEvent.code === "Enter") {
            this.addNewTodo();
        }
    }

    handleButtonClick = () => {
        if (this.isSending) {
            return;
        }
        this.addNewTodo();
    }

    addNewTodo = () => {
        const { value } = this.state;
        if (!value) {
            return;
        }
        this.isSending = true;
        return this.props.addNewTodo(value)
            .then(_ => {
                this.isSending = false;
                this.setState({ value: '' });
            })
            .catch(error => {

                this.setState({
                    hasError: error
                });

                setTimeout(() => {
                    this.setState({
                        hasError: null
                    });
                }, 400)
            })
    }

    render() {
        const { hasError, value } = this.state;
        return <div className="todo-input__wrapper">
            <input
                placeholder='Add new todo'
                type='text'
                className={`todo-input ${hasError ? 'todo-input--error' : ''}`}
                value={value}
                onKeyDown={this.handleOnKeyDown}
                onChange={this.handleOnChange}
            />
            <button
                className="todo-input__button"
                onClick={this.handleButtonClick}>
                +
            </button>
        </div>
    }
}
