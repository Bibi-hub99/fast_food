import ParamButton from "./param-button"

function Order(props){

    return (
        <div className={'rounded-md py-2 mt-16'}>
            <div className={'overflow-auto px-2 box-border bg-orange-500 pb-2 pt-[3rem] rounded-t-md relative'}>
                <ParamButton

                btnInnerText={'Mark Done'}
                btnStyle={'bg-black text-white py-1 px-2 box-border rounded-xl absolute top-1 right-1 cursor-pointer hover:bg-gray-900'}
                handleClick={props.handleDeleteOrder}
                meal_id={props.orderID}/>
                <table className={'order-table'}>
                    <thead className={''}>
                        <tr>
                            <th>Customer Name</th>
                            <th>{props.customerName}</th>
                        </tr>
                        <tr>
                            <th>Customer Number</th>
                            <th>{props.customerTelephone}</th>
                        </tr>
                        <tr>
                            <th>Customer Address</th>
                            <th>{props.customerAddress}</th>
                        </tr>
                        <tr>
                            <th>Highest Spent</th>
                            <th>R {props.highestSpent}</th>
                        </tr>
                        <tr>
                            <th>Lowest Spent</th>
                            <th>R {props.lowestSpent}</th>
                        </tr>
                        <tr>
                            <th>Average</th>
                            <th>R {props.average}</th>
                        </tr>
                        <tr>
                            <th>Number of Items</th>
                            <th>{props.itemsNum}</th>
                        </tr>
                        <tr>
                            <th>Total Price</th>
                            <th>R {props.totalPrice}</th>
                        </tr>

                    </thead>
                </table>

            </div>
            <div className={'overflow-auto px-2 box-border bg-gray-500 rounded-b-md'}>
                <table className={'w-[100%] text-center'}>
                    <thead className={'border-1'}>
                        <tr className={'border-b-1'}>
                            <th className={'py-2'}>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Order