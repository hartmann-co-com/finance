const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
});

const Decimal = ({decimal, editable = false}) => {
    // noinspection JSXNamespaceValidation
    return (
        decimal !== null
            ? (
                editable === true
                    ? (<><input type="number"
                                value={decimal}/></>)
                    : (<>{formatter.format(decimal)}</>)
            )
            : null
    );
};

const Int = ({int, editable = false}) => {
    return (
        int !== null && int !== undefined
            ? (
                editable === true
                    ? (<><input type="number" value={int}/></>)
                    : (<>{int}</>)
            )
            : null
    );
}

export const Number = ({decimal, int, editable = false}) => {
    return (
        <>
            <Decimal decimal={decimal} editable={editable}/>
            <Int int={int} editable={editable}/>
        </>
    );
};