import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import {select_product} from '../actions'

const url = 'http://localhost:2020'

class ProductDetail extends Component {

    state = {totalPrice:0, listItem:{}}

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        var productId = params.product_id

      
        axios.get( url+`/product/${productId}`)
        .then((res) => {
            //this.props.select_product(res.data)
            this.setState({listItem:res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnCartClick = () => {
        var idproduct = this.props.product.id
        var namaProduk = this.props.product.nama
        var img = this.props.product.img
        var price = this.props.product.harga
        var qty = this.refs.qty.value
        var username = this.props.username
        
        axios.get(url+'/cart',{
            params:{
                idproduct:idproduct
            }
        })
        .then((res) => {
          if(res.data.length == 0){
            axios.post(url+'/cart' , {
                idproduct : idproduct,
                namaProduk : namaProduk,
                img: img,
                price : price,
                qty:qty,
                totalHarga : price*qty,
                username:username
            })
            .then((res1) => {
                alert('Produk berhasil dimasukan ke Keranjang')
            })
            .catch((err) => {
                console.log(err)
            })
          }
          else if(res.data.length > 0 && res.data[0].idproduct == idproduct){
            axios.put(url+'/cart/'+res.data[0].id, {
                idproduct : idproduct,
                namaProduk : namaProduk,
                img: img,
                price: price,
                qty: parseInt(res.data[0].qty) + parseInt(qty),
                totalHarga : (price*qty) + res.data[0].totalHarga,
                username:username
            })
            .then((res1) => {
                alert('Produk berhasil dimasukan ke Keranjang')
            })
            .catch((err) => {
                console.log(err)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    }


    render() {
        //var {nama, merk, jenis, harga, img, description} = this.props.product
        var {nama, merk, jenis, harga, img, description, stok} = this.state.listItem
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" >
                        <img src={img} alt={img} className="img-responsive"  />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h3>{jenis}</h3>
                        </div>
                        <div className="row">
                            <h4>Rp. {harga}</h4>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div className="row">
                            <h4>Pesan:</h4>
                        </div>
                        <div className="row">
                            <input type="number" style={{ marginLeft:'10px' , width: '60px' , marginRight:'10px'}} className="form-input" ref="qty" name="qty" id="qty" defaultValue = "1"/> <p style={{color:'red'}}>Barang tersedia: {stok}</p>
                            <span></span>
                            <br></br>
                            <input type="button" className=" btn btn-success" value="Add to Cart" style={{width:450}} onClick={this.onBtnCartClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { product: state.selectedProduct}
}

export default connect(mapStateToProps, {select_product}) (ProductDetail);