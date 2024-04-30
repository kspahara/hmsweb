import { NetworkPage } from "../../pages/network/network._index"

async function getData() {
    const data:any=[
        {
            id:1,
            title:"abc"
        },
        {
            id:2,
            title:"abc"
        }
    ]
    return data        
}
async function loader() {
    const message='ListPage'
    const type="list"
    return {message,data:await getData(),type}
}

export function Network() {
    return (<><NetworkPage /></>)
}
Network.loader=loader