import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import moment from 'moment'

const url = 'http://localhost:2020'
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
const cookie = new Cookies();

class History extends Component {
    state = {user:null, listHistory:[], listDetail:[]}

    componentDidMount(){
        const username = cookie.get('dataUser');
        this.setState({user:username})
        this.getListHistory()
    }

    getListHistory = () => {
        axios.get(url+'/history' , {
                username : this.state.user
        })
        .then((res) => {
            this.setState({listHistory : res.data})
        })
    }

    onBtnDetailClick = (Idnya) => {
        axios.get(url+'/orderDetail/' , {
                params:{
                    idHistory:Idnya
                }
        })
        .then((res) => {
            this.setState({listDetail : res.data})
        })
    }

    onBtnCloseClick = () => {
        this.setState({listDetail:[]})
    }

    renderBodyHistory= () => {
        var listHistoryJSX = this.state.listHistory.map(({id,username,tglTrans,totalItem,totalPrice}) => {
            return(
                <tr>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{moment(tglTrans).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td style={{width:'20px'}}>{totalItem}</td>
                    <td style={{width:'20px'}}>{rupiah.format(totalPrice)}</td>
                    <td><input className="btn btn-success" type='button' value='Detail' onClick={() => this.onBtnDetailClick(id)} /></td>
                </tr>
            )
        })
        return listHistoryJSX;
    }

    renderDetail= () => {
        var listDetailJSX = this.state.listDetail.map(({id,idHistory,idproduct,img,qty,namaProduk,price,totalHarga}) => {
            return(
                <tr>
                <td>{id}</td>
                <td>{idHistory}</td>
                <td>{namaProduk}</td>
                <td><img src={img} width="50px" alt={namaProduk}/></td>
                <td>{rupiah.format(price)}</td>
                <td style={{width:'20px'}}>{qty}</td>
                <td style={{width:'20px'}}>{rupiah.format(totalHarga)}</td>
                <td></td>
        </tr>
            )
        })
        return listDetailJSX;
    }

    renderBodyDetail=() =>{
        if(this.state.listDetail.length != 0){
            return(
                <div>
                <table style={{marginTop:'40px'}}>
                <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Invoice</th>
                            <th>Nama Produk</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                            <th><input className="btn btn-danger" type="button" value="Close"  onClick={() => this.onBtnCloseClick()}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDetail()}
                    </tbody>
                    </table>
            </div>
            )
        }

    }

    render() {
        return (
            <div className='container'>
                <center>
                    <h1 style={{marginTop:'20px'}}>My Cart</h1>
                </center>
                <table style={{marginTop:'40px'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Tanggal Transaksi</th>
                            <th>Total Item</th>
                            <th>Total Harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyHistory()}
                    </tbody>
                    </table>
                    {this.renderBodyDetail()}
                </div>
        )
    }

}

export default History;