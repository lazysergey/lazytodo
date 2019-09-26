import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './TodoInput.scss';

export class TodoInput extends PureComponent {
    state = {
        value: '',
        isSending: false
    }

    handleOnChange = (e) => {
        this.setState({
            value: e.target.value,
            hasError: false
        });
    }

    handleOnKeyDown = (e) => {
        if (this.state.isSending) {
            return;
        }
        if (e.nativeEvent.code === "Enter") {
            this.addNewTodo();
        }
    }

    handleButtonClick = () => {
        if (this.state.isSending) {
            return;
        }
        this.addNewTodo();
    }

    addNewTodo = () => {
        const { value } = this.state;
        if (!value.trim()) {
            this.setInputErrorState(true);
            this.setState({ value: '' });
            return;
        }
        this.setState({
            isSending: true
        })

        return this.props.addNewTodo(value)
            .then(_ => {
                this.setState({ value: '', isSending: false });
                this.todoInputElementRef.focus();
            })
            .catch(error => {
                this.setInputErrorState(error);
            })
    }

    setInputErrorState = (error) => {
        this.setState({
            hasError: error
        });

        setTimeout(() => {
            this.setState({
                hasError: null
            });
        }, 400)
    }

    render() {
        const { hasError, value, isSending } = this.state;
        const className = [
            'todo-input',
            hasError ? 'todo-input--error' : null,
            isSending ? 'todo-input--sending' : null
        ].filter(c => c).join(' ');

        return (
            <div className="todo-input__wrapper">
                <input
                    ref={(input) => { this.todoInputElementRef = input; }}
                    autoFocus
                    placeholder='Add new task...'
                    type='text'
                    className={className}
                    value={value}
                    onKeyDown={this.handleOnKeyDown}
                    onChange={this.handleOnChange}
                    disabled={isSending}
                />
                <button
                    className={`todo-input__button ${hasError ? 'todo-input__button--error' : ''}`}
                    onClick={this.handleButtonClick}>
                    +
            </button>
            </div >
        )
    }
}

TodoInput.propTypes = {
    addNewTodo: PropTypes.func.isRequired
}