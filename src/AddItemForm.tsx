import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !=="") {
            props.addItem(title)
            setTitle("")
        } else setError("Title is required!")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
         if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>

            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm
