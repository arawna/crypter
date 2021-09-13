import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import * as Yup from "yup";
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

export default function WriteMessage() {

    let [cyriptedText, setCyriptedText] = useState("")

    const convertSchema = Yup.object().shape({
        message: Yup.string().required("Lütfen bu alanı doldurunuz."),
        key: Yup.string().required("Lütfen bu alanı doldurunuz.")
    })

    const formik = useFormik({
        initialValues: {
            message:"",
            key:""
        },
        validationSchema: convertSchema,
        onSubmit: (values) => {
            setCyriptedText(CryptoJS.AES.encrypt(values.message,values.key).toString());
            toast.success("Mesajınış şifrelendi")
        }
    })

    useEffect(() =>{
        document.title="Mesaj Şifreleme - Mesaj Yaz"
    })

    return (
        <div>
            <h2>MESAJ YAZ</h2>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="message" style={{fontSize:"20px"}}><b>Mesaj</b></Label>
                    <Input 
                        style={{backgroundColor:"transparent",borderColor:"#2C394B" ,borderWidth:"5px",borderRadius:"50px",minHeight:"6rem",color:"white"}} 
                        type="textarea"
                        name="message"
                        id="message"
                        placeholder="Mesaj"
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
                        style={{backgroundColor:"transparent",borderColor:"#2C394B",borderWidth:"5px",borderRadius:"50px",color:"white"}} 
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
                <Button className="mt-3" color="danger"><b>ŞİFRELE</b></Button>
            </Form>
            {cyriptedText &&<div className="mt-4">
                <h2>ŞİFRELENMİŞ METİN</h2>
                <p style={{overflow:"auto",borderColor:"#2C394B",borderWidth:"5px",borderStyle:"solid",padding:"8px",borderRadius:"50px"}}> {cyriptedText} </p>
            </div>}
        </div>
    )
}
