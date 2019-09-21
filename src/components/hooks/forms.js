import {useState} from 'react';

// by convension prfix the hook name with "use" useHookName so other developers would understand it's a hook

export const useFormInput = () => {
    const [value, setValue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = (e) => {
        setValue(e.target.value);

        if(e.target.value.trim() === "") {
            setValidity(false);
        } else {
            setValidity(true);
        }
    }

    return {value: value, onChange: inputChangeHandler, validity};
}