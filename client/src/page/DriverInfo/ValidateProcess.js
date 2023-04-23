import { memo, useEffect, useMemo } from "react";

function ValidateProcess({ value, chains, show, onValidUpdate}){
    const validateMessages = useMemo(
        () => {
            const result = [];
            chains.forEach((chain) => {
                if(!chain.checkFunc(value)){
                    result.push(chain.message);
                }
            });

            return result;
        },
        [value, chains]
    );

    useEffect(() => {
        onValidUpdate(validateMessages.length === 0);
    }, [validateMessages])

    return (
        show &&
        <div>
            {
                validateMessages.map((message) => {
                    return (
                        <span key={message} className="text-red-500">{message}</span>
                    );
                })
            }
        </div>
    );
}

export default memo(ValidateProcess);