import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
const url = 'http://localhost:2020'

const cookie = new Cookies();
class Cart extends Component {
    
    state = {user: null, listCart : [], idSelectedtoEdit: 0}

    componentDidMount(){
        const username = cookie.get('dataUser');
        this.setState({user:username})
        this.getListCart()
    }

    getListCart = () => {
        axios.get(url+'/cart')
        .then((res) => {
            this.setState({listCart : res.data})
        })
        .catch((err) => {
        })
    }

    onBtnEditClick = (Idnya) => {
        this.setState({idSelectedtoEdit:Idnya})
    }

    onBtnSaveClick = (id) => {
        var id = this.state.listCart[id-1].id
        var idproduct = this.state.listCart[id-1].idproduct
        var namaProduk = this.state.listCart[id-1].namaProduk
        var img = this.state.listCart[id-1].img
        var price = this.state.listCart[id-1].price
        var qty = parseInt(this.refs.qtyEdit.value)
        var totalHarga = parseInt(this.refs.qtyEdit.value)*this.state.listCart[id-1].price
        var username = this.state.user
        axios.put(url+'/cart/'+id, {
            qty: qty,
            id: id,
            idproduct: idproduct,
            namaProduk: namaProduk,
            img: img,
            price: price,
            totalHarga: totalHarga,
            username:username
        })
        .then((res) => {
            this.setState({idSelectedtoEdit:0})
            this.getListCart()
        })
        .catch((err) => {
        })
    }

    onBtnRemoveClick = (id) => {
        if(window.confirm('Are sure to remove this item?')){
            axios.delete(url+'/cart/' + id)
            .then((res) => {
                this.getListCart();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    renderBodyCart = () => {
        var listCartJSX = this.state.listCart.map(({id, img, namaProduk, price, qty, totalHarga}) => {
            if (this.state.idSelectedtoEdit === id) {
                return(
                    <tr>
                        <td>{id}</td>
                        <td>{namaProduk}</td>
                        <td><img src={img} width="50px" alt={namaProduk}/></td>
                        <td>{rupiah.format(price)}</td>
                        <td><input type="number" ref="qtyEdit" defaultValue={qty}/></td>
                        <td style={{width:'20px'}}>{rupiah.format(totalHarga)}</td>
                        <td><input className="btn btn-success" type="button" value="Save"  onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({idSelectedtoEdit:0})}/></td>
                    </tr>
                )
            }
            return(
                <tr>
                    <td>{id}</td>
                    <td>{namaProduk}</td>
                    <td><img src={img} width="50px" alt={namaProduk}/></td>
                    <td>{rupiah.format(price)}</td>
                    <td style={{width:'20px'}}>{qty}</td>
                    <td style={{width:'20px'}}>{rupiah.format(totalHarga)}</td>
                    <td><input className="btn btn-success" type="button" value="Edit"  onClick={() => this.onBtnEditClick(id)}/></td>
                    <td><input className="btn btn-danger" type="button" value="Remove" onClick={() => this.onBtnRemoveClick(id)}/></td>
                </tr>
            )
        })
        return listCartJSX;
    }

  
    onCheckOut = () => {
        if(window.confirm('Are sure to checkout?')){
            var order = this.state.listCart
            var tanggal = new Date()
            var totalItem = 0
            var totalPrice = 0
            for(let i=0; i < order.length; i++){
                totalItem = totalItem + parseInt(order[i].qty)
                totalPrice = totalPrice + order[i].totalHarga
            }
            axios.post(url+'/history', {
                username : this.state.user,
                tglTrans: tanggal,
                totalItem : totalItem, 
                totalPrice : totalPrice
            })
            .then((res) => {
                for(let i = 0 ; i < order.length ; i ++){
                    axios.post(url+'/orderDetail',{
                        idHistory: res.data.id,
                        qty: order[i].qty,
                        idProduct: order[i].idproduct,
                        namaProduk: order[i].namaProduk,
                        img: order[i].img,
                        price: order[i].price,
                        totalHarga: order[i].totalHarga,
                        username:this.state.user
                    })
                    .then((res) => {
                        axios.delete(url+'/cart/'+order[i].id)
                        .then((res) => {
                            console.log(res)         
                        })
                    })
                    
                }
            })
            this.setState({listCart:[]})
        }
    }

    renderTotalHarga = () => {
        var total = 0
        for(let i = 0; i < this.state.listCart.length ; i++){
            total += this.state.listCart[i].totalHarga
        }
        return(
            <div className='col-2'>
                <h3>{rupiah.format(total)}</h3>
                <input className="btn btn-primary" type='button' value='Check Out' onClick ={this.onCheckOut}/>
            </div>
        )
    }


    render() {
        if(this.state.listCart.length > 0){
            return (
                <div className='container'>
                    <center>
                        <h1 style={{marginTop:'20px'}}>My Cart</h1>
                    </center>
                    <table style={{marginTop:'40px'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyCart()}
                    </tbody>
                    </table>
                    <center>
                        <div><h5>Total Belanja Anda:</h5></div>
                        {this.renderTotalHarga()}
                    </center>
                </div>
            )
        }
        return(
            <center>
                <div className='col-4'>
                    <h1>Keranjang anda kosong</h1>
                    <Link to='/productlist'><input type="button" className='btn-primary' value="Lanjutkan Belanja"/></Link>          
                </div>
            </center>
        )
    }
}


export default Cart;