import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ProductItem from './ProductItem';

const url = 'http://localhost:2020'

const cookie = new Cookies();
class ProductList extends Component {

    state = { user: null, listProduct: [], searchListProduct: []};

    componentDidMount() {
        const username = cookie.get('dataUser');
        this.setState({user:username})
   
        axios.get(url +'/product')
        .then((res) => {
            this.setState({listProduct: res.data, searchListProduct: res.data})
        })
        .catch((err) => {
            console.log (err)
        })
    }

  onBtnSearchClick = () => {
    var nama = this.refs.namaSearch.value;
    var merk = this.refs.merkSearch.value;
    var jenis = this.refs.jenisSearch.value;
    var hargaMin = parseInt(this.refs.hargaMinSearch.value);
    var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

    var arrSearch = this.state.listProduct.filter((item) => {
      return (item.nama.toLowerCase().includes(nama.toLowerCase()) && 
        item.merk.toLowerCase().includes(merk.toLowerCase()) && 
        item.jenis.includes(jenis) &&
        item.harga >= hargaMin &&
        item.harga <= hargaMax)
    })
    this.setState({searchListProduct: arrSearch})

  }

  renderListProduct = () => {
    var total = 12;
    var size = 4;
    var check = true;
    var listJSXProduct = this.state.searchListProduct.map((item) => {
      if (total === 0 && check === true) {
        size = 6;
        total = 12;
        check = false;
      }
      else if (total === 0 && check === false){
        size = 4;
        total = 12;
        check = true;
      }
      total -= size;

      return (
        <ProductItem size={size} product={item} />
      )
    })
    return listJSXProduct;
  }
    render(){
            if(this.props.product.id !== 0) {
              return <Redirect to={`/detailproduct?product_id=${this.props.product.id}&nama_product=${this.props.product.nama}`} />
            }
            return(
              <section className="bg-light" id="portfolio">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Product List</h2>
                    <h3 className="section-subheading text-muted">Belanja hemat dan puas!</h3>
                  </div>
                  <div>Filter By:</div>
                  <div>
                        Jenis: <select ref="jenisSearch">
                            <option value="">All</option>
                            <option>Elektronik</option>
                            <option>Pakaian</option>
                            <option>Makanan</option>
                        </select>
                        
                        Merk: <input type="text" ref="merkSearch" placeholder="Merk"/>
                        
                        Nama Produk: <input type="text" ref="namaSearch" placeholder="Nama Produk"/>
                       
                        Harga: Rp. <input type="number" ref="hargaMinSearch" defaultValue="0"/> - Rp. <input type="number" ref="hargaMaxSearch" defaultValue="99999999"/>
                        <div><p>...</p></div>
                        <center><input type="button" className="btn btn-success col-2" value="Search" onClick={this.onBtnSearchClick} />
                        <br/><br/><br/><br/></center>
                  </div>
                </div>
                <div className="row">
                {this.renderListProduct()}
                </div>
              </div>
            </section>
          );

    }
}

const mapStateToProps = (state) => {
  return {
      product: state.selectedProduct};
  }
      
export default connect(mapStateToProps)(ProductList);

