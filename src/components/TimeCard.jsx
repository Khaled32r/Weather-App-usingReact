import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import "../App.css"
import axios from 'axios';
import moment from 'moment';
import { useEffect,useState } from 'react'
import { useTranslation } from 'react-i18next';








let cancelRequest=null
export default function TimeCard() {


    const {t,i18n}=useTranslation();

    const [local,setLocal]=useState("ar")

    const [time,setTime]=useState("")

    const [tdata,setTdata]=useState({
        temp:null,
        description:"",
        max:null,
        min:null,
        name:"",
        icone:""
    })


    useEffect(()=>{
        i18n.changeLanguage(local);
    },[i18n,local])

    // this is api request **
        useEffect(()=>{
            setTime( moment().format('MMMM Do YYYY, h:mm:ss a'))
            axios
            .get('https://api.openweathermap.org/data/2.5/weather?lat=33.510414&lon=36.27&appid=025ebb19ddd8e2d5bc6a7d7cf1047e24',
                {cancelToken:   new axios.CancelToken((c)=>{cancelRequest=c;})}
            )

            .then((response)=>{
                setTdata({
                    temp:Math.round(response.data.main.temp -272.15),
                    description:response.data.weather[0].description,
                    max:Math.round(response.data.main.temp_max -272.15),
                    min:Math.round(response.data.main.temp_min -272.15),
                    name:response.data.name,
                    icone:response.data.weather[0].icon
                });
            })

            .catch((error)=>{
            console.error(error)
            })

            return ()=>{
                cancelRequest()
            }
        },[])


        function changeLan(){
            if (local==="ar") {
                setLocal("en")
                i18n.changeLanguage("en")
            }else{
                setLocal("ar")
                i18n.changeLanguage("ar")
            }
        }

    return (
        <div dir={`${local=="ar"?"ltr":"rtl"}`}>
            <Card sx={{ maxWidth: 450, backgroundColor: '#0d47a1', color: 'white', borderRadius: 4 }} >
                <CardContent>
                        <Typography variant="h2">{t(tdata.name) }</Typography>
                        <p>{time}</p>
                        <hr/>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                    
                            <CloudIcon sx={{ fontSize: 150 }} />
                            <span style={{margin:"30px"}}><img src={`https://openweathermap.org/img/wn/${tdata.icone}@2x.png`}/></span>
                            <Box>
                                <Typography variant="h1">{tdata.temp}</Typography>
                                <Typography>{t(tdata.description)}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography variant="body2">{t("min")}: {tdata.min}</Typography>
                            <Typography variant="body2">{t("max")}: {tdata.max}</Typography>
                        </Box>

                </CardContent>
                <Button style={{marginRight:"300px"}} onClick={changeLan}>{local=="en"?"Arabic":"انجليزي"}</Button>
            </Card>
        </div>
    );
    }