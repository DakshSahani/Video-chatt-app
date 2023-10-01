import classNames from 'classnames';

function Button({
    children,
    primary,
    secondary,
    success,
    rounded,
    outline,
    ...rest
}){
    const classes = classNames(rest.className,"py-1 px-2 w-24 text-white border-2 active:scale-[0.9] hover:border-white border-2",{
        "bg-purple-600 border-purple-700":primary,
        "bg-red-500 border-red-600":secondary,
        "bg-green-600 border-green-500":success,
        "rounded-full":rounded,
        "!bg-white border-3 !border-purple-600 !text-purple-600":outline && primary,
        "!bg-white border-3 !border-red-500 !text-red-500":outline && secondary,
        "!bg-white border-3 !border-green-600 !text-green-600":outline && success,
    })

    return <button {...rest} className={classes}>{children}</button>
}


export default Button;