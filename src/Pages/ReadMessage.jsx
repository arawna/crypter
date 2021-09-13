import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import CryptoJS from 'crypto-js';

export default function ReadMessage() {

    const [messageForRead,setMessageForRead] = useState("");

    const convertSchema = Yup.object().shape({
        message: Yup.string().required("Lütfen bu alanı doldurunuz."),
        key: Yup.string().required("Lütfen bu alanı doldurunuz.")
    })

    const formik = useFormik({
        initialValues:{
            message:"",
            key:""
        },
        validationSchema: convertSchema,
        onSubmit:(values) => {
            setMessageForRead(CryptoJS.AES.decrypt(values.message,values.key).toString(CryptoJS.enc.Utf8));
        }
    })

    useEffect(()=> {
        document.title="Mesaj Şifreleme - Mesaj Oku"
    },[])

    return (
        <div>
            <h2>MESAJ OKU</h2>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="message" style={{fontSize:"20px"}}><b>Şifrelenmiş Mesaj</b></Label>
                    <Input 
                        style={{backgroundColor:"transparent",borderColor:"#2C394B",color:"white",borderWidth:"5px",borderRadius:"50px",minHeight:"6rem"}} 
                        type="textarea"
                        name="message"
                        id="message"
                        placeholder="Şifrelenmiş Mesaj"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.errors.message && formik.touched.message}
                    />
                    <FormFeedback> {formik.errors.message} </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="key" style={{fontSize:"20px"}}><b>Şifreleme Metni</b></Label>
                    <Input 
                        style={{backgroundColor:"transparent",borderColor:"#2C394B",color:"white",borderWidth:"5px",borderRadius:"50px"}} 
                        type="password"
                        name="key"
                        id="key"
                        placeholder="Şifreleme Metni"
                        value={formik.values.key}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.errors.key && formik.touched.key}
                    />
                    <FormFeedback> {formik.errors.key} </FormFeedback>
                </FormGroup>
                <Button className="mt-3" color="danger"><b>ŞİFREYİ ÇÖZ</b></Button>
            </Form>
            {messageForRead &&<div className="mt-4">
                <h2>ŞİFRESİ ÇÖZÜLMÜŞ METİN</h2>
                <p> {messageForRead} </p>
            </div>}
        </div>
    )
}
