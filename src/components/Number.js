const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
});

const Decimal = ({decimal, editable = false, onChange}) => {
    // noinspection JSXNamespaceValidation
    return (
        decimal !== null
            ? (
                editable === true
                    ? (<><span style={{'font-family': 'courier'}}>
                        <input type="number"
                               onChange={onChange}
                               value={decimal}/></span></>)
                    : (<><span style={{'font-family': 'courier'}}>
                        {formatter.format(decimal)}</span></>)
            )
            : null
    );
};

const Int = ({int, editable = false, onChange}) => {
    return (
        int !== null && int !== undefined
            ? (
                editable === true
                    ? (<><input type="number" onChange={onChange} value={int}/></>)
                    : (<>{int}</>)
            )
            : null
    );
}

export const Number = ({decimal, int, editable = false, onChange}) => {
    return (
        <>
            <Decimal decimal={decimal} editable={editable} onChange={onChange}/>
            <Int int={int} editable={editable}/>
        </>
    );
};