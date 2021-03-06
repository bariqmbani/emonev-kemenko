import React, { useContext,useEffect,useState } from 'react'
import { Document,Page,Text,Image,StyleSheet,Font, View } from '@react-pdf/renderer'
import { ArtikelContext } from '../../context/Artikel/artikelContext'
import axios from 'axios'
import logo_kemenko from '../../assets/logo_kemenko.png'
import line2 from '../../assets/line2.png'
import logo_footer from '../../assets/logo_footer.png'
import image from '../../assets/image.png'

Font.register({
    family: 'Open Sans',
    src: 'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf'
});

const style = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingBottom: 80,
        paddingLeft: 60,
        paddingRight: 60,
        fontSize: 7,
        position: 'relative'
    },

    header: {
        textAlign: 'center',     
    },

    headerBold: {
        fontFamily: 'Open Sans',
    },

    isi: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 25,
        textAlign:'justify'
    },

    isiWaktu: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        textAlign:'justify'
    },

    isiFix: {
        marginLeft: 20,
        marginTop: 10,
        textAlign:'justify'
    },

    
    headerMargTop: {
        marginTop: 6,
    },


    headerMargBot: {
        marginBottom: 8
    },
    
    footer: {
        marginTop: 30
    },

    footer2: {
        position: 'absolute',
        bottom: 30,
        left: 60,
        right: 60,
    },

    images : {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    
    textimage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    isiFlex: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 25,
        display: 'flex',
        flexDirection: "row"
    },

    isiimage: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        textAlign:'justify',
        width: 100,
        height: 100,
        position : 'relative',
        overflow: 'hidden',
    },

    logoFooter1: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 70
    },

    logoFooter2: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 70
    },

    headerMargBold: {
        marginBottom: 8,
        fontFamily: 'Open Sans'
    },

    text: {
        marginBottom: 10,
    },

    signature: {
        width: 80,
        position: 'relative',
        right: -395,
        marginTop: 3
    },

    ttd: {
        marginTop: 30
    },
    
    red: {
        color: 'black'
    },
    image: {
        height: 53,
        width: 53,
        position: 'absolute',
        top: -3,
        left: 5
    },
    kop: {
        marginLeft: 65,
        width: 500
    },
    line: {
        marginBottom: 12,
        marginTop: 14

    },

    line2: {
        marginBottom: 29
    },

    halaman: {
        position: 'absolute',
        left: 100,
        bottom: 0,
    }
})


const DownloadGNRM = (props) => {
    
    const nol = (i) => {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }
    
    const mydate = new Date(props.data.document1&&props.data.document1.tanggal_diperbarui);
    const hour = nol(mydate.getHours());
    const minute = nol(mydate.getMinutes());
    const date = mydate.getDate();
    let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][mydate.getMonth()];
    let str =  hour + ':' + minute + ' WIB, ' + date + ' ' + month + ' ' + mydate.getFullYear();

    return(
            <Document size='A4'>
                <Page style={style.body}>
                    {/*KOP*/}
                    <View fixed>
                        <Image style={style.image} source={`https://api.simonev.revolusimental.go.id${props.data.instansi && props.data.instansi.logo}`}/>
                        <View style={style.kop}>
                            <Text style={style.headerBold}>
                                Gerakan Nasional Revolusi Mental
                            </Text>
                            <Text style={style.headerBold}>
                                Sekretariat
                            </Text>
                            <Text>
                                {props.data.instansi && props.data.instansi.alamat}
                            </Text>
                            {/* <Text>
                                Gedung Kementerian Koordinator Bidang Pembangunan Manusia & Kebudayaan
                            </Text> */}
                            <Text>
                                Telp {props.data.instansi && props.data.instansi.kontak}; Fax {props.data.instansi && props.data.instansi.fax};
                            </Text>
                            <Text>
                                website : {props.data.instansi && props.data.instansi.website}, email: {props.data.instansi && props.data.instansi.email}
                            </Text>
                        </View>
                        <Image style={style.line} source={line2}/>
                    </View>
                        {/*Header*/}
                    <View style={style.header}>
                        <Text style={style.headerBold}>
                            Proteksi Input Program Gerakan Nasional Revolusi Mental (GNRM) Tahun <Text style={style.red}>{props.data.document1.form && props.data.document1.form.tahun}</Text>
                        </Text>
                        <Text style={style.headerMargTop}>
                            Dilarang menyalin, menyimpan, memperbanyak sebagian atau seluruh laporan ini dalam bentuk
                        </Text>
                        <Text style={style.headerMargBot}>    
                            apapun kecuali oleh Koordinator Pelaksana Gerakan (KPG) dan Sektretariat Revolusi Mentai
                        </Text>
                        <Text style={style.headerMargBold}>
                            PROGRAM PELAKSANAAN GNRM <Text style={style.red}>{props.data.document1.form && props.data.document1.form.tahun}</Text>
                        </Text>
                        <Text>
                            ID PROGRAM : <Text style={style.red}>{props.data.document1.form && props.data.document1.form.id_program}</Text>
                        </Text>
                        <Text style={style.headerMargTop}>
                            Program <Text style={style.red}>{props.data.document1.instansi}</Text> GNRM TAHUN <Text style={style.red}>{props.data.document1.form && props.data.document1.form.tahun}</Text>
                        </Text>
                    </View>

                    {/*Body*/}
                    <View style={style.headerMargTop}>
                        <Text style={style.isiWaktu}>
                            Waktu Unggah : {str}
                        </Text>
                        <Text style={style.headerBold}>
                            1.        Nama Instansi
                        </Text>
                        <Text style={style.isi}>
                            {props.data.instansi.nama}
                        </Text>
                        <Text style={style.headerBold}>
                            2.        Kegiatan
                        </Text>
                        <View style={style.isi}>
                            <Text style={style.text}>
                                Nama Program : {props.data.document1.form && props.data.document1.form.kegiatan.nama_program}. 
                            </Text>
                            <Text style={style.text}>
                                Kegiatan Prioritas : {props.data.document1.form && props.data.document1.form.kp}. 
                            </Text>
                            <Text style={style.text}>
                                Program Prioritas : {props.data.document1.form && props.data.document1.form.prop}. 
                            </Text>
                            <Text > 
                                Penjelasan : {props.data.document1.form && props.data.document1.form.kegiatan.penjelasan_kegiatan}
                            </Text>
                        </View>
                        <Text style={style.headerBold}>
                            3.        Output
                        </Text>
                        <View style={style.isi}>
                            <Text style={style.text}>
                                Sasaran : {props.data.document1.form && props.data.document1.form.output.sasaran}
                            </Text>
                            <Text style={style.text}>
                                Target : {props.data.document1.form && props.data.document1.form.output.target}
                            </Text>
                            <Text>
                                Indikator Capaian : {props.data.document1.form && props.data.document1.form.output.indikator_capaian}
                            </Text>
                        </View>
                        <Text style={style.headerBold}>
                            4.        Kondisi Awal
                        </Text>
                        <Text style={style.isiFix}>
                            {props.data.document1.form && props.data.document1.form.kondisi_awal}
                        </Text>
                        <View style={style.isiFlex}>
                            {
                                props.data.document1.form && props.data.document1.form.lampiran.kondisi_awal.map((media,index) => {
                                    return(
                                        <View style={style.isiimage} wrap={false}>
                                            <Image style={style.images} source={image}/>
                                            <Text style={style.textimage}>
                                                {media.filename.length > 40 ? `${media.filename.substr(0,37)}...` : media.filename}
                                            </Text>
                                        </View>
                                    )   
                                })
                            }
                        </View>
                        <Text style={style.headerBold}>
                            5.        Anggaran
                        </Text>
                        <View style={style.isi}>
                            <Text style={style.text}>
                                Besar Anggaran : {props.data.document1.form && props.data.document1.form.anggaran.besar_anggaran}
                            </Text>
                            <Text>
                                Sasaran : {props.data.document1.form && props.data.document1.form.anggaran.sumber_dana}
                            </Text>
                        </View>
                        <Text style={style.headerBold}>
                            6.        Proses Perkembangan Pelaksanaan Kegiatan
                        </Text>
                        <Text style={style.isiFix}>
                            {props.data.document1.form && props.data.document1.form.proses}
                        </Text>
                        <View style={style.isiFlex}>
                            {
                                props.data.document1.form && props.data.document1.form.lampiran.proses.map((media,index) => {
                                    return(
                                        <View style={style.isiimage} wrap={false}>
                                            <Image style={style.images} source={image}/>
                                            <Text style={style.textimage}>
                                                {media.filename.length > 40 ? `${media.filename.substr(0,37)}...` : media.filename}
                                            </Text>
                                        </View>
                                    )   
                                })
                            }
                        </View>
                        <Text style={style.headerBold}>
                            7.        Pihak Terkait
                        </Text>
                        <View style={style.isi} >
                            {
                                (props.data.document1.form && props.data.document1.form.pihak_terkait).map((pihak,index) => {
                                    return(
                                        <View>
                                            <Text style={style.text}>
                                                Lembaga : {pihak.lembaga}
                                            </Text>
                                            <Text style={style.text}>
                                                Peran : {pihak.peran}
                                            </Text>
                                            <Text>
                                                Penjelasan : {pihak.penjelasan_pihak_terkait}
                                            </Text>
                                        </View>
                                    )
                                })  
                            }
                        </View>
                        <Text style={style.headerBold}>
                            8.        Lampiran Media
                        </Text>
                        <View style={style.isiFlex}>
                            {
                                props.data.document1.form && props.data.document1.form.lampiran.media.map((media,index) => {
                                    return(
                                        <View style={style.isiimage} wrap={false}>
                                            <Image style={style.images} source={image}/>
                                            <Text style={style.textimage}>
                                                {media.filename.length > 40 ? `${media.filename.substr(0,37)}...` : media.filename}
                                            </Text>
                                        </View>
                                    )   
                                })
                            }
                        </View>
                        
                    </View>

                    {/*Footer*/}
                    <View wrap={false}>
                        <View style={style.footer}>
                            <Text>
                                Demikian program ini dibuat dan dapat dikoordinasikan untuk dilaksanakan sebagaimana mestinya
                            </Text>
                            <Text>
                                Atas perhatiannya diucapkan terimakasih
                            </Text>
                        </View>

                        <View style={style.signature} wrap={false}>
                            <Text>
                                ....................,....................
                            </Text>
                            <Text>
                                {props.data.document1.form && props.data.document1.form.penanggung_jawab.nama}
                            </Text>
                            <Text style={style.ttd}>
                                TTD
                            </Text>
                            <Text>
                                NIP. {props.data.document1.form && props.data.document1.form.penanggung_jawab.nip}
                            </Text>
                        </View>
                    </View>
                    
                    <Text
                        style={{
                            fontSize: '8px',
                            color: '#aaa',
                            position: 'absolute',
                            minHeight: '40px',
                            bottom: '5px',
                            right: '190px',

                        }}
                        render={({ pageNumber, totalPages }) => (
                            `Halaman ${pageNumber}`
                        )}
                        fixed
                        />
                    
                    <View style={style.footer2} fixed>
                        <Image style={style.line2} source={line2} fixed/> 
                        <Image style={style.logoFooter1} source={logo_footer}/>
                        <Image style={style.logoFooter2} source={logo_footer}/>
                    </View>

                </Page>
            </Document>
    )
}

export default DownloadGNRM;