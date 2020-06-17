import React,{Component,Fragment,useState,useContext,useEffect} from 'react';
import logo_kemenko from '../../assets/logo_kemenko.png'
import SideBarOff from '../../component/SideBarOff/SideBarOff';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios'
import './FormInfografis.css'
import objectToFormData from '../../objectToFormDataUtil'
import { AuthContext } from '../../context/Auth/AuthContext'
import { ArtikelContext } from '../../context/Artikel/artikelContext';
import { InfografisContext } from '../../context/Infografis/InfografisContext';
import Popup from '../../component/Popup/Popup';

const FormInfografis = (props) => {
    const { infografisDetail,setInfografis } = useContext(InfografisContext)
    const { token } = useContext(AuthContext)
    const history = useHistory()

    console.log(infografisDetail)

    const [ infografis , setInfografisDoc ] = useState([])

    const onChangeFiles = (event) => {
		setInfografisDoc([...infografis , ...event.target.files])
    }

    console.log(infografis)
    
    const onEdit = async (event) => {
        event.preventDefault()
        
        const formData = new FormData()

		for (let i = 0; i < infografis.length; i++) {
			formData.append(`infografis`, infografis[i])
        }

        for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
        }
        
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'X-Auth-Token': `aweuaweu ${token}`,
			},
		}

		const res = await axios.put(`https://test.bariqmbani.me/api/v1/infografis/${props.match.params.id}`,formData,config)
        history.push('/infografis')
    }
    
    const urlToFile = async (url) => {
        const getFileName = (url) => {
            const split = url.split('/')
            return split[split.length -1]
        }
        
        const name = getFileName(url)
        
        try {
            const res = await fetch(url)
            const blob = res.blob()
            return new File([blob],name)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setInfografis(props.match.params.id)
    },[])

    return(
        <Fragment>
            <SideBarOff/>
            <Popup notif={props.notif}/>
            <div>
                    <div className="tajuk-page">
                    <h1> INFOGRAFIS PELAKSANAAN PROGRAM</h1>
                    </div>

                    <form onSubmit={onEdit}>
                        <div className="form-container">
                            <div className="form-infografis">
                                <div>
                                    <label>Nama Program</label>
                                    <input 
                                        className="persist" 
                                        type="text"
                                        style={{width:'955px', height:'42px' , marginLeft:'93px'}} 
                                        disabled
                                        value={infografisDetail && infografisDetail.nama_program}
                                    >
                                    </input>
                                </div>
                                <div>
                                    <label>Deskripsi</label>
                                    <textarea  
                                        type="text"
                                        style={{width:'955px', height:'159px' , marginLeft:'142px'}} 
                                        name='deskripsi'
                                        value={infografisDetail && infografisDetail.penjelasan_kegiatan}
                                    >
                                    </textarea>
                                </div>
                                <div>
                                    <label>Lampiran Infografis</label>
                                    <label htmlFor='testing' className='label_lampiran' style={{marginLeft:'57px'}}><span style={{marginRight:'15px'}}>+</span> PILIH FILE</label>
                                    <input 
                                        id="testing"
                                        className="gnrm-penjelasan" 
                                        onChange={onChangeFiles}
                                        type="file"
                                        accept="image/*"
                                        name="media"
                                        multiple
                                    />
                                </div>
                                <div>
                                    <div style={{height: "fit-content", 
                                                marginLeft: "215px", 
                                                width: "955px",
                                                border: '1px solid black',
                                                padding: '10px',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                borderRadius: '5px'
                                            }} 
                                    >
                                    {
                                        infografis.map((infografis,index) => {
                                            return(
                                                <div key={infografis.lastModified}>
                                                        <div style={{width:'150px', 
                                                                    height:'150px', 
                                                                    backgroundColor:'black', 
                                                                    marginRight:'35px', 
                                                                    position:'relative'}}
                                                        >
                                                            <div style={{position:'absolute', 
                                                                        backgroundColor:'#C04B3E' , 
                                                                        width:'25px' , 
                                                                        height:'25px', 
                                                                        borderRadius:'50%', 
                                                                        top:'-7px', 
                                                                        right:'-7px', 
                                                                        lineHeight:'25px', 
                                                                        textAlign:'center',
                                                                        cursor:'pointer'}}
                                                            > X </div>
                                                        </div>
                                                        <div style={{marginTop:'10px' , 
                                                                    width:'150px' , 
                                                                    height:'20px', 
                                                                    overflow:'hidden', 
                                                                    lineHeight:'20px'}}
                                                        >{infografis.name}</div>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </div>

                            <div className="gnrm-navigation-button">
                                <button type="submit" className="unggah-infografis" onClick={onEdit}>UNGGAH INFOGRAFIS</button>
                            </div>

                        </div>
                    </form>
            </div>
        </Fragment>
    )
}

export default FormInfografis;