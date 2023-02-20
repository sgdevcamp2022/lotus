import {useState, useCallback, ChangeEvent, Dispatch} from "react";
import React from "react";

type ReturnTypes<T = any> = [T, (e:any)=>void, Dispatch<React.SetStateAction<T>>];
const useInput = <T = any>(DefaultValue: T):ReturnTypes => {
    const [value, setValue] = useState<T>(DefaultValue);
    const onChangeValue = useCallback((e:any)=>{
        setValue(e.target.value);
    }, [setValue])
    return [value, onChangeValue, setValue]
}

export default useInput;