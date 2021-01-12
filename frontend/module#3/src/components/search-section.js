import React, { Component } from 'react';
import '../styles/style.css'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import  { Redirect } from 'react-router-dom'

class search extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      showSecondDate:false,
      goToNextPage:false,
      showError:false,
      date:''
    }
    this.changeSecondData = this.changeSecondData.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.getDate = this.getDate.bind(this);
  }
  getDate(){
    var n =  new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    var fdate=y+"-"+m+"-"+ d;
    this.setState({
      date:fdate
    })

  }
  changeSecondData(e){
    console.log(e)
    if (e=="round"){
      this.setState({
        showSecondDate: !this.state.showSecondDate
      })
    }else{
      this.setState({
        showSecondDate: false
      })
    }
    
  }
  checkInputs() {
    if(this.props.arrival=="" ||this.props.departure==""||this.props.date==""||this.props.type=="" ){
     console.log("Enter all the values")
      this.setState({
        showError:true
      })
    } else if (this.props.arrival!="" && this.props.departure!="" && this.props.date!="" && this.props.type!="" ){
      console.log("yes all the values are complete")
      if (this.props.type == "round") {
        if(this.props.returnDate==""){
          console.log("Please enter the date of your return")
          this.setState({
            showError:true
          })
        }else{
          console.log("yes g sari values compete hain ")
          this.setState({
            goToNextPage:true
          })  
        }
      }
      this.setState({
        goToNextPage:true
      })
    }
    
  }

  
  componentDidMount(){
    this.getDate()
    console.log("the date is",this.state.date)
  }
  render() {
      if(this.state.goToNextPage==true){
        return <Redirect to='/flightList'  />
      }
      const {showSecondDate}=this.state
        return (
            <div className="wrapper">
                <section className="search-area">   
                    <div className="container">
                        <div className="main-quest-container">
                            <h1>Where to next?</h1>
                        </div>
                        <div className="main-search-container">
                            <div className="from-search">
                            
                                <Autocomplete
                                    onChange={(event, value) =>{
                                        if(value!=null){
                                          this.props.changeDeparture(value.Code)
                                        }else{
                                          this.props.changeDeparture("")
                                        }
                                        
                                    }}
                                    id="combo-box-demo"
                                    options={airports}
                                    getOptionLabel={(option) => option.City + "(" + option.Country +")"}
                                    style={{ backgroundColor: "white",width: 200 }}
                                    color="secondary"
                                    renderInput={(params) => <TextField {...params}  label="From" variant="outlined"  />}
                                />
                                
                            </div>
                            <div className="to-search">
                                
                                <Autocomplete
                                    onChange={(event, value) =>{
                                       if(value!=null){
                                        this.props.changeArrival(value.Code)
                                       }else{
                                        this.props.changeArrival("")
                                       }
                                        
                                    }}
                                    id="combo-box-demo"
                                    options={airports}
                                    getOptionLabel={(option) => option.City + "(" + option.Country +")"}
                                    style={{  backgroundColor: "white" ,width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
                                /></div>
                            <div className="date">
                                {/*<label>Date:</label><br />*/}
                                <input type="date" max={this.props.returnDate!="" ?(this.props.returnDate):("")} onChange={event=> this.props.changeDate(event.target.value)}/> 
                          </div>
                          <div className="date1">
                          {showSecondDate ? (<input type="date" min={this.props.date!="" ?(this.props.date):("")} onChange={event=> this.props.changeReturnDate(event.target.value)}/>):(<br/>)}
                          </div>
                         
                            <div className="tripType">
                                <label>Round-Trip  </label>
                    <input type="radio" name="type" value="round" onClick={event=> this.changeSecondData(event.target.value)} onChange={event => this.props.changeType(event.target.value)}/>
                                <label>      One-way   </label>
                                <input type="radio" name="type" value="1way" onClick={event=> this.changeSecondData(event.target.value)} onChange={event=> this.props.changeType(event.target.value)}/>    
                            </div>
                  {this.state.showError ?(<p className="showError">**Please enter all the required details***</p>):(<br/>)
                    
                            }
                            <div className="search-btn">
                                
                                <Link to={this.state.goToNextPage ?("/flightList"):("")}  onClick={this.checkInputs} className="search-button">Search</Link>
                                
                            </div> 
                        </div>
                    </div>
                </section>
            </div>
            
        );

    }
}

export default search;

const styles = {
    input: {
      color: "white"
    }
  };

  
const airports=[
    {
       Country:" Denmark "
      ,City:"Aalborg"
      ,Code:"AAL"
    },
    {
       Country:" Norway "
      ,City:"Aalesund"
      ,Code:"AES"
    },
    {
       Country:" Denmark - Bus service "
      ,City:"Aarhus"
      ,Code:"ZID"
    },
    {
       Country:" Denmark - Tirstrup "
      ,City:"Aarhus"
      ,Code:"AAR"
    },
    {
       Country:" Greenland "
      ,City:"Aasiaat"
      ,Code:"JEG"
    },
    {
       Country:" Iran "
      ,City:"Abadan"
      ,Code:"ABD"
    },
    {
       Country:" Russia "
      ,City:"Abakan"
      ,Code:"ABA"
    },
    {
       Country:" BC "
      ,City:"Abbotsford"
      ,Code:"YXX"
    },
    {
       Country:" SD "
      ,City:"Aberdeen"
      ,Code:"ABR"
    },
    {
       Country:" United Kingdom "
      ,City:"Aberdeen"
      ,Code:"ABZ"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Abha"
      ,Code:"AHB"
    },
    {
       Country:" Cote d'Ivoire "
      ,City:"Abidjan"
      ,Code:"ABJ"
    },
    {
       Country:" TX "
      ,City:"Abilene"
      ,Code:"ABI"
    },
    {
       Country:" United Arab Emirates "
      ,City:"Abu Dhabi"
      ,Code:"AUH"
    },
    {
       Country:" Egypt "
      ,City:"Abu Simbel"
      ,Code:"ABS"
    },
    {
       Country:" Nigeria "
      ,City:"Abuja"
      ,Code:"ABV"
    },
    {
       Country:" Mexico "
      ,City:"Acapulco"
      ,Code:"ACA"
    },
    {
       Country:" Venezuela "
      ,City:"Acarigua"
      ,Code:"AGV"
    },
    {
       Country:" Ghana "
      ,City:"Accra"
      ,Code:"ACC"
    },
    {
       Country:" AK "
      ,City:"Adak Island"
      ,Code:"ADK"
    },
    {
       Country:" Turkey "
      ,City:"Adana"
      ,Code:"ADA"
    },
    {
       Country:" Ethopia "
      ,City:"Addis Ababa"
      ,Code:"ADD"
    },
    {
       Country:" Australia "
      ,City:"Adelaide"
      ,Code:"ADL"
    },
    {
       Country:" Yemen "
      ,City:"Aden"
      ,Code:"ADE"
    },
    {
       Country:" Russia "
      ,City:"Adler/Sochi"
      ,Code:"AER"
    },
    {
       Country:" Algeria "
      ,City:"Adrar"
      ,Code:"AZR"
    },
    {
       Country:" Soloman Islands "
      ,City:"Afutara"
      ,Code:"AFT"
    },
    {
       Country:" Morocco "
      ,City:"Agadir"
      ,Code:"AGA"
    },
    {
       Country:" India "
      ,City:"Agartala"
      ,Code:"IXA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Agaun"
      ,Code:"AUP"
    },
    {
       Country:" France "
      ,City:"Agen"
      ,Code:"AGF"
    },
    {
       Country:" India "
      ,City:"Agra"
      ,Code:"AGR"
    },
    {
       Country:" Turkey "
      ,City:"Agri"
      ,Code:"AJI"
    },
    {
       Country:" Puerto Rico "
      ,City:"Aguadilla"
      ,Code:"BQN"
    },
    {
       Country:" Mexico "
      ,City:"Aguascalientes"
      ,Code:"AGU"
    },
    {
       Country:" Japan "
      ,City:"Aguni"
      ,Code:"AGJ"
    },
    {
       Country:" India "
      ,City:"Ahmedabad"
      ,Code:"AMD"
    },
    {
       Country:" Iran "
      ,City:"Ahwaz"
      ,Code:"AWZ"
    },
    {
       Country:" Marshall Islands "
      ,City:"Ailuk Island"
      ,Code:"AIM"
    },
    {
       Country:" Mauritania "
      ,City:"Aioun El Atrouss"
      ,Code:"AEO"
    },
    {
       Country:" Marshall Islands "
      ,City:"Airok"
      ,Code:"AIC"
    },
    {
       Country:" Cook Islands "
      ,City:"Aitutaki"
      ,Code:"AIT"
    },
    {
       Country:" India "
      ,City:"Aizawl"
      ,Code:"AJL"
    },
    {
       Country:" France "
      ,City:"Ajaccio"
      ,Code:"AJA"
    },
    {
       Country:" AK "
      ,City:"Akiachak"
      ,Code:"KKI"
    },
    {
       Country:" AK "
      ,City:"Akiak"
      ,Code:"AKI"
    },
    {
       Country:" Japan "
      ,City:"Akita"
      ,Code:"AXT"
    },
    {
       Country:" OH "
      ,City:"Akron/Canton"
      ,Code:"CAK"
    },
    {
       Country:" China "
      ,City:"Aksu"
      ,Code:"AKU"
    },
    {
       Country:" Kazakhstan "
      ,City:"Aktyubinsk"
      ,Code:"AKX"
    },
    {
       Country:" QC "
      ,City:"Akulivik"
      ,Code:"AKV"
    },
    {
       Country:" Iceland "
      ,City:"Akureyri"
      ,Code:"AEY"
    },
    {
       Country:" AK "
      ,City:"Akuton"
      ,Code:"KQA"
    },
    {
       Country:" United Arab Emirates "
      ,City:"Al Ain"
      ,Code:"AAN"
    },
    {
       Country:" Egypt "
      ,City:"Al Arish"
      ,Code:"AAC"
    },
    {
       Country:" Yemen "
      ,City:"Al Ghaydah"
      ,Code:"AAY"
    },
    {
       Country:" Morocco "
      ,City:"Al Hoceima"
      ,Code:"AHU"
    },
    {
       Country:" AK "
      ,City:"Alakanuk"
      ,Code:"AUK"
    },
    {
       Country:" NM "
      ,City:"Alamogordo"
      ,Code:"ALM"
    },
    {
       Country:" CO "
      ,City:"Alamosa"
      ,Code:"ALS"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Al-Baha"
      ,Code:"ABT"
    },
    {
       Country:" NY "
      ,City:"Albany"
      ,Code:"ALB"
    },
    {
       Country:" OR - Bus service "
      ,City:"Albany"
      ,Code:"CVO"
    },
    {
       Country:" OR - Bus service "
      ,City:"Albany"
      ,Code:"QWY"
    },
    {
       Country:" NM "
      ,City:"Albuquerque"
      ,Code:"ABQ"
    },
    {
       Country:" Australia "
      ,City:"Albury"
      ,Code:"ABX"
    },
    {
       Country:" United Kingdom "
      ,City:"Alderney"
      ,Code:"ACI"
    },
    {
       Country:" ON - Rail service "
      ,City:"Aldershot"
      ,Code:"XLY"
    },
    {
       Country:" AK "
      ,City:"Aleknagik"
      ,Code:"WKK"
    },
    {
       Country:" Syrian Arab Republic "
      ,City:"Aleppo"
      ,Code:"ALP"
    },
    {
       Country:" South Africa "
      ,City:"Alexander Bay"
      ,Code:"ALJ"
    },
    {
       Country:" Egypt "
      ,City:"Alexandria"
      ,Code:"ALY"
    },
    {
       Country:" LA "
      ,City:"Alexandria"
      ,Code:"AEX"
    },
    {
       Country:"ON - Rail service "
      ,City:"Alexandria"
      ,Code:"XFS"
    },
    {
       Country:" Greece "
      ,City:"Alexandroupolis"
      ,Code:"AXD"
    },
    {
       Country:" United Arab Emirates "
      ,City:"Al-Fujairah"
      ,Code:"FJR"
    },
    {
       Country:" Italy "
      ,City:"Alghero"
      ,Code:"AHO"
    },
    {
       Country:" Algeria "
      ,City:"Algiers"
      ,Code:"ALG"
    },
    {
       Country:" Spain "
      ,City:"Alicante"
      ,Code:"ALC"
    },
    {
       Country:" Australia "
      ,City:"Alice Springs"
      ,Code:"ASP"
    },
    {
       Country:" AK "
      ,City:"Allakaket"
      ,Code:"AET"
    },
    {
       Country:" PA "
      ,City:"Allentown"
      ,Code:"ABE"
    },
    {
       Country:" NE "
      ,City:"Alliance"
      ,Code:"AIA"
    },
    {
       Country:" QC "
      ,City:"Alma"
      ,Code:"YTF"
    },
    {
       Country:" Kazakhstan "
      ,City:"Almaty"
      ,Code:"AKX"
    },
    {
       Country:" Spain "
      ,City:"Almeria"
      ,Code:"LEI"
    },
    {
       Country:" Indonesia "
      ,City:"Alor Island"
      ,Code:"ARD"
    },
    {
       Country:" Malaysia "
      ,City:"Alorsetar"
      ,Code:"AOR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Alotau"
      ,Code:"GUR"
    },
    {
       Country:" MI "
      ,City:"Alpena"
      ,Code:"APN"
    },
    {
       Country:" Norway "
      ,City:"Alta"
      ,Code:"ALF"
    },
    {
       Country:" Brazil "
      ,City:"Altamira"
      ,Code:"ATM"
    },
    {
       Country:" China "
      ,City:"Altay"
      ,Code:"AAT"
    },
    {
       Country:" Switzerland "
      ,City:"Altenrhein"
      ,Code:"ACH"
    },
    {
       Country:" Argentina "
      ,City:"Alto Rio Senguerr"
      ,Code:"ARR"
    },
    {
       Country:" PA "
      ,City:"Altoona"
      ,Code:"AOO"
    },
    {
       Country:" Japan "
      ,City:"Amami O Shima"
      ,Code:"ASJ"
    },
    {
       Country:" TX "
      ,City:"Amarillo"
      ,Code:"AMA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Amazon Bay"
      ,Code:"AZB"
    },
    {
       Country:" Madagascar "
      ,City:"Ambanja"
      ,Code:"IVA"
    },
    {
       Country:" Madagascar "
      ,City:"Ambatomainty"
      ,Code:"AMY"
    },
    {
       Country:" Madagascar "
      ,City:"Ambatondrazaka"
      ,Code:"WAM"
    },
    {
       Country:" AK "
      ,City:"Ambler"
      ,Code:"ABL"
    },
    {
       Country:" Indonesia "
      ,City:"Ambon"
      ,Code:"AMQ"
    },
    {
       Country:" Kenya "
      ,City:"Amboseli"
      ,Code:"ASV"
    },
    {
       Country:" Russia "
      ,City:"Amderma"
      ,Code:"AMV"
    },
    {
       Country:" Jordan - Civil/Marka Airport "
      ,City:"Amman"
      ,Code:"ADJ"
    },
    {
       Country:" Jordan - Queen Alia International "
      ,City:"Amman"
      ,Code:"AMM"
    },
    {
       Country:" India "
      ,City:"Amritsar"
      ,Code:"ATQ"
    },
    {
       Country:" Netherlands "
      ,City:"Amsterdam"
      ,Code:"AMS"
    },
    {
       Country:" Russia "
      ,City:"Anadyr"
      ,Code:"DYR"
    },
    {
       Country:" BC "
      ,City:"Anahim Lake"
      ,Code:"YAA"
    },
    {
       Country:" AK "
      ,City:"Anaktueuk"
      ,Code:"AKP"
    },
    {
       Country:" Madagascar "
      ,City:"Analalava"
      ,Code:"HVA"
    },
    {
       Country:" Russia "
      ,City:"Anapa"
      ,Code:"AAQ"
    },
    {
       Country:" AK "
      ,City:"Anchorage"
      ,Code:"ANC"
    },
    {
       Country:" Italy "
      ,City:"Ancona"
      ,Code:"AOI"
    },
    {
       Country:" Norway "
      ,City:"Andenes"
      ,Code:"ANX"
    },
    {
       Country:" Uzbekistan "
      ,City:"Andizhan"
      ,Code:"AZN"
    },
    {
       Country:" Vanuatu "
      ,City:"Aneityum"
      ,Code:"AUY"
    },
    {
       Country:" Sweden "
      ,City:"Angelholm/Helsingborg"
      ,Code:"JHE"
    },
    {
       Country:" France - Marce "
      ,City:"Angers"
      ,Code:"ANE"
    },
    {
       Country:" France - Rail service "
      ,City:"Angers"
      ,Code:"QXG"
    },
    {
       Country:" Indonesia "
      ,City:"Anggi"
      ,Code:"AGD"
    },
    {
       Country:" China "
      ,City:"Anging"
      ,Code:"AQG"
    },
    {
       Country:" ON "
      ,City:"Angling Lake"
      ,Code:"YAX"
    },
    {
       Country:" AK "
      ,City:"Angoon"
      ,Code:"AGN"
    },
    {
       Country:" France "
      ,City:"Angouleme"
      ,Code:"ANG"
    },
    {
       Country:" Anguilla "
      ,City:"Anguilla"
      ,Code:"AXA"
    },
    {
       Country:" AK "
      ,City:"Aniak"
      ,Code:"ANI"
    },
    {
       Country:" Vanuatu "
      ,City:"Aniwa"
      ,Code:"AWD"
    },
    {
       Country:" China "
      ,City:"Ankang"
      ,Code:"AKA"
    },
    {
       Country:" Turkey - Esenboga "
      ,City:"Ankara"
      ,Code:"ESB"
    },
    {
       Country:" Turkey - Etimesqut "
      ,City:"Ankara"
      ,Code:"ANK"
    },
    {
       Country:" Madagascar "
      ,City:"Ankavandra"
      ,Code:"JVA"
    },
    {
       Country:" Algeria "
      ,City:"Annaba"
      ,Code:"AAE"
    },
    {
       Country:" France "
      ,City:"Annecy"
      ,Code:"NCY"
    },
    {
       Country:" Madagascar "
      ,City:"Antalaha"
      ,Code:"ANM"
    },
    {
       Country:" Turkey "
      ,City:"Antalya"
      ,Code:"AYT"
    },
    {
       Country:" Madgascar "
      ,City:"Antaninvarivo"
      ,Code:"TNR"
    },
    {
       Country:" Antigua and Barbuda "
      ,City:"Antigua"
      ,Code:"ANU"
    },
    {
       Country:" Chile "
      ,City:"Antofagasta"
      ,Code:"ANF"
    },
    {
       Country:" Madagascar "
      ,City:"Antsalova"
      ,Code:"WAQ"
    },
    {
       Country:" Madagascar "
      ,City:"Antsiranana"
      ,Code:"DIE"
    },
    {
       Country:" Madagascar "
      ,City:"Antsohihy"
      ,Code:"WAI"
    },
    {
       Country:" Belgium - Bus service "
      ,City:"Antwerp"
      ,Code:"ZAY"
    },
    {
       Country:" Belgium - Deurne Airport "
      ,City:"Antwerp"
      ,Code:"ANR"
    },
    {
       Country:" AK "
      ,City:"Anvik"
      ,Code:"ANV"
    },
    {
       Country:" Japan "
      ,City:"Aomori"
      ,Code:"AOJ"
    },
    {
       Country:" Italy "
      ,City:"Aosta"
      ,Code:"AOT"
    },
    {
       Country:" Colombia "
      ,City:"Apartado"
      ,Code:"APO"
    },
    {
       Country:" Western Samoa "
      ,City:"Apia"
      ,Code:"APW"
    },
    {
       Country:" Western Samoa "
      ,City:"Apia"
      ,Code:"FGI"
    },
    {
       Country:" WI "
      ,City:"Appleton"
      ,Code:"ATW"
    },
    {
       Country:" Jordan "
      ,City:"Aqaba"
      ,Code:"AQJ"
    },
    {
       Country:" Brazil "
      ,City:"Araca"
      ,Code:"AJU"
    },
    {
       Country:" Brazil "
      ,City:"Aracatuba"
      ,Code:"ARU"
    },
    {
       Country:" Romania "
      ,City:"Arad"
      ,Code:"ARW"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Aragip"
      ,Code:"ARP"
    },
    {
       Country:" Brazil "
      ,City:"Araguaina"
      ,Code:"AUX"
    },
    {
       Country:" Brazil "
      ,City:"Arapoti"
      ,Code:"AAG"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Arar"
      ,Code:"RAE"
    },
    {
       Country:" Colombia "
      ,City:"Arauca"
      ,Code:"AUC"
    },
    {
       Country:" Ethiopia "
      ,City:"Arba Mintch"
      ,Code:"AMH"
    },
    {
       Country:" CA "
      ,City:"Arcata"
      ,Code:"ACV"
    },
    {
       Country:" NU "
      ,City:"Arctic Bay"
      ,Code:"YAB"
    },
    {
       Country:" AK "
      ,City:"Arctic Village"
      ,Code:"ARC"
    },
    {
       Country:" Iran "
      ,City:"Ardabil"
      ,Code:"ADU"
    },
    {
       Country:" Peru "
      ,City:"Arequipa"
      ,Code:"AQP"
    },
    {
       Country:" Sweden "
      ,City:"Argelholm/Helsingborg"
      ,Code:"AGH"
    },
    {
       Country:" Australia "
      ,City:"Argyle"
      ,Code:"GYL"
    },
    {
       Country:" Chile "
      ,City:"Arica"
      ,Code:"ARI"
    },
    {
       Country:" Russia "
      ,City:"Arkangelsk"
      ,Code:"ARH"
    },
    {
       Country:" Colombia "
      ,City:"Armenia"
      ,Code:"AXM"
    },
    {
       Country:" Australia "
      ,City:"Armidale"
      ,Code:"ARM"
    },
    {
       Country:" Bahamas "
      ,City:"Arthur's Town"
      ,Code:"ATC"
    },
    {
       Country:" Uganda "
      ,City:"Arua"
      ,Code:"RUA"
    },
    {
       Country:" Aruba "
      ,City:"Aruba"
      ,Code:"AUA"
    },
    {
       Country:" Tanzania "
      ,City:"Arusha"
      ,Code:"ARK"
    },
    {
       Country:" NU "
      ,City:"Arviat"
      ,Code:"YEK"
    },
    {
       Country:" Sweden "
      ,City:"Arvidsjaur"
      ,Code:"AJR"
    },
    {
       Country:" Japan "
      ,City:"Asahikawa"
      ,Code:"AKJ"
    },
    {
       Country:" NC "
      ,City:"Asheville"
      ,Code:"AVL"
    },
    {
       Country:" Turkmenistan "
      ,City:"Ashgabat"
      ,Code:"ASB"
    },
    {
       Country:" KY/Huntington"
      ,City:"Ashland"
      ,Code:"HTS"
    },
    {
       Country:" Eritrea "
      ,City:"Asmara"
      ,Code:"ASM"
    },
    {
       Country:" Ethopia "
      ,City:"Asosa"
      ,Code:"ASO"
    },
    {
       Country:" CO "
      ,City:"Aspen"
      ,Code:"ASE"
    },
    {
       Country:" Egypt "
      ,City:"Assiut"
      ,Code:"ATZ"
    },
    {
       Country:" Kazakhstan "
      ,City:"Astana"
      ,Code:"TSE"
    },
    {
       Country:" Russia "
      ,City:"Astrakhan"
      ,Code:"ASF"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Asturias"
      ,Code:"OVD"
    },
    {
       Country:" Paraguay "
      ,City:"Asuncion"
      ,Code:"ASU"
    },
    {
       Country:" Egypt "
      ,City:"Aswan"
      ,Code:"ASW"
    },
    {
       Country:" Yemen "
      ,City:"Ataq"
      ,Code:"AXK"
    },
    {
       Country:" GA "
      ,City:"Athens"
      ,Code:"AHN"
    },
    {
       Country:" Greece "
      ,City:"Athens"
      ,Code:"ATH"
    },
    {
       Country:" Cook Islands "
      ,City:"Atiu Island"
      ,Code:"AIU"
    },
    {
       Country:" AK "
      ,City:"Atka"
      ,Code:"AKB"
    },
    {
       Country:" GA "
      ,City:"Atlanta"
      ,Code:"ATL"
    },
    {
       Country:" NJ "
      ,City:"Atlantic City"
      ,Code:"AIY"
    },
    {
       Country:" Solomon Islands "
      ,City:"Atoifi"
      ,Code:"ATD"
    },
    {
       Country:" AK "
      ,City:"Atqasuk"
      ,Code:"ATK"
    },
    {
       Country:" ON "
      ,City:"Attawapiskat"
      ,Code:"YAT"
    },
    {
       Country:" French Polynesia "
      ,City:"Atuona"
      ,Code:"AUQ"
    },
    {
       Country:" Kazakhstan "
      ,City:"Atyrau"
      ,Code:"GUW"
    },
    {
       Country:" New Zealand "
      ,City:"Auckland"
      ,Code:"AKL"
    },
    {
       Country:" Germany "
      ,City:"Augsburg/Munich"
      ,Code:"AGB"
    },
    {
       Country:" GA "
      ,City:"Augusta"
      ,Code:"AGS"
    },
    {
       Country:" ME "
      ,City:"Augusta"
      ,Code:"AUG"
    },
    {
       Country:" Solomon Islands "
      ,City:"Auki"
      ,Code:"AKS"
    },
    {
       Country:" QC "
      ,City:"Aupaluk"
      ,Code:"YPJ"
    },
    {
       Country:" Marshall Islands "
      ,City:"Aur Island"
      ,Code:"AUL"
    },
    {
       Country:" India "
      ,City:"Aurangabad"
      ,Code:"IXU"
    },
    {
       Country:" France "
      ,City:"Aurillac"
      ,Code:"AUR"
    },
    {
       Country:" Australia "
      ,City:"Aurukun"
      ,Code:"AUU"
    },
    {
       Country:" TX "
      ,City:"Austin"
      ,Code:"AUS"
    },
    {
       Country:" France "
      ,City:"Avignon"
      ,Code:"AVN"
    },
    {
       Country:" Indonesia "
      ,City:"Ayawaki"
      ,Code:"AYW"
    },
    {
       Country:" Australia "
      ,City:"Ayers Rock"
      ,Code:"AYQ"
    },
    {
       Country:" Indonesia "
      ,City:"Babo"
      ,Code:"BXB"
    },
    {
       Country:" Philippines "
      ,City:"Bacolod"
      ,Code:"BCD"
    },
    {
       Country:" Spain "
      ,City:"Badajcz"
      ,Code:"BJZ"
    },
    {
       Country:" Indonesia "
      ,City:"Bade"
      ,Code:"BXD"
    },
    {
       Country:" Australia "
      ,City:"Badu Island"
      ,Code:"BDD"
    },
    {
       Country:" India "
      ,City:"Bagdogra"
      ,Code:"IXB"
    },
    {
       Country:" QC "
      ,City:"Bagotville"
      ,Code:"YBG"
    },
    {
       Country:" Ethiopia "
      ,City:"Baharpar"
      ,Code:"BJR"
    },
    {
       Country:" Pakistan "
      ,City:"Bahawalpur"
      ,Code:"BHV"
    },
    {
       Country:" Argentina "
      ,City:"Bahia Blanca"
      ,Code:"BHI"
    },
    {
       Country:" Panama "
      ,City:"Bahia Pinas"
      ,Code:"BFQ"
    },
    {
       Country:" Colombia "
      ,City:"Bahia Solano"
      ,Code:"BSC"
    },
    {
       Country:" Bahrain "
      ,City:"Bahrain"
      ,Code:"BAH"
    },
    {
       Country:" Romania "
      ,City:"Baia Mare"
      ,Code:"BAY"
    },
    {
       Country:" QC "
      ,City:"Baie Comeau"
      ,Code:"YBC"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Baimuru"
      ,Code:"VMU"
    },
    {
       Country:" NU "
      ,City:"Baker Lake"
      ,Code:"YBK"
    },
    {
       Country:" CA "
      ,City:"Bakersfield"
      ,Code:"BFL"
    },
    {
       Country:" Azerbaijan "
      ,City:"Baku"
      ,Code:"GYD"
    },
    {
       Country:" Solomon Islands "
      ,City:"Balalae"
      ,Code:"BAS"
    },
    {
       Country:" Turkey "
      ,City:"Balikesir"
      ,Code:"BZI"
    },
    {
       Country:" Indonesia "
      ,City:"Balikpapan"
      ,Code:"BPN"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Balimo"
      ,Code:"OPU"
    },
    {
       Country:" Australia "
      ,City:"Ballina"
      ,Code:"BNK"
    },
    {
       Country:" Chile "
      ,City:"Balmaceda"
      ,Code:"BBA"
    },
    {
       Country:" MD "
      ,City:"Baltimore"
      ,Code:"BWI"
    },
    {
       Country:" Iran "
      ,City:"Bam"
      ,Code:"BXR"
    },
    {
       Country:" Australia "
      ,City:"Bamaga"
      ,Code:"ABM"
    },
    {
       Country:" Mali "
      ,City:"Bamako"
      ,Code:"BKO"
    },
    {
       Country:" Indonesia "
      ,City:"Banda Aceh"
      ,Code:"BTJ"
    },
    {
       Country:" Iran "
      ,City:"Bandar Abbas"
      ,Code:"BND"
    },
    {
       Country:" Indonesia - Branti "
      ,City:"Bandar Lampung"
      ,Code:"TKG"
    },
    {
       Country:" Iran "
      ,City:"Bandar Lengeh"
      ,Code:"BDH"
    },
    {
       Country:" Brunei "
      ,City:"Bandar Seri Begawan"
      ,Code:"BWN"
    },
    {
       Country:" Indonesia "
      ,City:"Bandung"
      ,Code:"BDO"
    },
    {
       Country:" India "
      ,City:"Bangalore"
      ,Code:"BLR"
    },
    {
       Country:" China "
      ,City:"Bangda"
      ,Code:"BPX"
    },
    {
       Country:" Thailand "
      ,City:"Bangkok"
      ,Code:"BKK"
    },
    {
       Country:" ME "
      ,City:"Bangor"
      ,Code:"BGR"
    },
    {
       Country:" Bosnia Herzegovina "
      ,City:"Banja Luka"
      ,Code:"BNX"
    },
    {
       Country:" Indonesia "
      ,City:"Banjarmasin"
      ,Code:"BDJ"
    },
    {
       Country:" Gambia "
      ,City:"Banjul"
      ,Code:"BJL"
    },
    {
       Country:" Viet Nam - Phung-Doc "
      ,City:"Banmethuot"
      ,Code:"BMV"
    },
    {
       Country:" Pakistan "
      ,City:"Bannu"
      ,Code:"BNP"
    },
    {
       Country:" Central African Republic "
      ,City:"Banqui"
      ,Code:"BGF"
    },
    {
       Country:" China "
      ,City:"Baoshan"
      ,Code:"BSD"
    },
    {
       Country:" China "
      ,City:"Baotou"
      ,Code:"BAV"
    },
    {
       Country:" ME "
      ,City:"Bar Harbour"
      ,Code:"BHB"
    },
    {
       Country:" Cuba "
      ,City:"Baracoa"
      ,Code:"BCA"
    },
    {
       Country:" Australia "
      ,City:"Barcaldine"
      ,Code:"BCI"
    },
    {
       Country:" Spain "
      ,City:"Barcelona"
      ,Code:"BCN"
    },
    {
       Country:" Venezuela "
      ,City:"Barcelona"
      ,Code:"BLA"
    },
    {
       Country:" Norway "
      ,City:"Bardufoss"
      ,Code:"BDU"
    },
    {
       Country:" Italy "
      ,City:"Bari"
      ,Code:"BRI"
    },
    {
       Country:" Venezuela "
      ,City:"Barinas"
      ,Code:"BNS"
    },
    {
       Country:" Malaysia "
      ,City:"Bario"
      ,Code:"BBN"
    },
    {
       Country:" Bangladesh "
      ,City:"Barisal"
      ,Code:"BZL"
    },
    {
       Country:" Russia "
      ,City:"Barnaul"
      ,Code:"BAX"
    },
    {
       Country:" Venezuela "
      ,City:"Barquisimeto"
      ,Code:"BRM"
    },
    {
       Country:" Costa Rica "
      ,City:"Barra Colorado"
      ,Code:"BCL"
    },
    {
       Country:" United Kingdom "
      ,City:"Barra"
      ,Code:"BRR"
    },
    {
       Country:" Colombia "
      ,City:"Barran Cabermeja"
      ,Code:"EJA"
    },
    {
       Country:" Colombia "
      ,City:"Barranquilla"
      ,Code:"BAQ"
    },
    {
       Country:" Brazil "
      ,City:"Barreiras"
      ,Code:"BRA"
    },
    {
       Country:" AK "
      ,City:"Barrow"
      ,Code:"BRW"
    },
    {
       Country:" AK "
      ,City:"Barter Island"
      ,Code:"BTI"
    },
    {
       Country:" Philippines "
      ,City:"Basco"
      ,Code:"BSO"
    },
    {
       Country:" Switzerland "
      ,City:"Basel"
      ,Code:"BSL"
    },
    {
       Country:" Switzerland "
      ,City:"Basel/Mulhouse Railway Station"
      ,Code:"ZDH"
    },
    {
       Country:" Iran "
      ,City:"Bashehr"
      ,Code:"BUZ"
    },
    {
       Country:" France "
      ,City:"Bastia"
      ,Code:"BIA"
    },
    {
       Country:" Indonesia "
      ,City:"Batam"
      ,Code:"BTH"
    },
    {
       Country:" NB "
      ,City:"Bathhurst"
      ,Code:"ZBF"
    },
    {
       Country:" Australia "
      ,City:"Bathurst Island"
      ,Code:"BRT"
    },
    {
       Country:" Australia "
      ,City:"Bathurst"
      ,Code:"BHS"
    },
    {
       Country:" Turkey "
      ,City:"Batman"
      ,Code:"BAL"
    },
    {
       Country:" Algeria "
      ,City:"Batna"
      ,Code:"BLJ"
    },
    {
       Country:" Indonesia "
      ,City:"Batom"
      ,Code:"BXM"
    },
    {
       Country:" LA "
      ,City:"Baton Rouge"
      ,Code:"BTR"
    },
    {
       Country:" Norway "
      ,City:"Batsfijord"
      ,Code:"BJF"
    },
    {
       Country:" Cambodia "
      ,City:"Battambang"
      ,Code:"BBM"
    },
    {
       Country:" Georgia "
      ,City:"Batumi"
      ,Code:"BUS"
    },
    {
       Country:" Solomon Islands "
      ,City:"Batuna"
      ,Code:"BPF"
    },
    {
       Country:" Brazil "
      ,City:"Bauru"
      ,Code:"BAU"
    },
    {
       Country:" MI "
      ,City:"Bay City"
      ,Code:"MBS"
    },
    {
       Country:" Cuba "
      ,City:"Bayamo"
      ,Code:"BYM"
    },
    {
       Country:" Germany "
      ,City:"Bayreuth"
      ,Code:"BYU"
    },
    {
       Country:" ON "
      ,City:"Bearskin Lake"
      ,Code:"XBE"
    },
    {
       Country:" TX "
      ,City:"Beaumont/Port Arthur"
      ,Code:"BPT"
    },
    {
       Country:" CO - Van service "
      ,City:"Beaver Creek"
      ,Code:"ZBV"
    },
    {
       Country:" AK "
      ,City:"Beaver"
      ,Code:"WBQ"
    },
    {
       Country:" Algeria "
      ,City:"Bechar"
      ,Code:"CBH"
    },
    {
       Country:" WV "
      ,City:"Beckley"
      ,Code:"BKW"
    },
    {
       Country:" MA "
      ,City:"Bedford"
      ,Code:"BED"
    },
    {
       Country:" Australia "
      ,City:"Bedourie"
      ,Code:"BEU"
    },
    {
       Country:" British Virgin Islands "
      ,City:"Beef Island"
      ,Code:"EIS"
    },
    {
       Country:" Ethiopia "
      ,City:"Beica"
      ,Code:"BEI"
    },
    {
       Country:" Libya - La Braq "
      ,City:"Beida"
      ,Code:"LAQ"
    },
    {
       Country:" China "
      ,City:"Beihai"
      ,Code:"BHY"
    },
    {
       Country:" China "
      ,City:"Beijing"
      ,Code:"PEK"
    },
    {
       Country:" Mozambique "
      ,City:"Beira"
      ,Code:"BEW"
    },
    {
       Country:" Lebanon "
      ,City:"Beirut"
      ,Code:"BEY"
    },
    {
       Country:" Algeria "
      ,City:"Bejaia"
      ,Code:"BJA"
    },
    {
       Country:" Mozambique "
      ,City:"Belaga"
      ,Code:"BLG"
    },
    {
       Country:" Brazil "
      ,City:"Belem"
      ,Code:"BEL"
    },
    {
       Country:" New Caledonia "
      ,City:"Belep Island"
      ,Code:"BMY"
    },
    {
       Country:" United Kingdom "
      ,City:"Belfast"
      ,Code:"BFS"
    },
    {
       Country:" United Kingdom "
      ,City:"Belfast"
      ,Code:"BHD"
    },
    {
       Country:" Russia "
      ,City:"Belgorod"
      ,Code:"EGO"
    },
    {
       Country:" Serbia and Montenegro - Beograd "
      ,City:"Belgrade"
      ,Code:"BEG"
    },
    {
       Country:" Belize - International "
      ,City:"Belize City"
      ,Code:"BZE"
    },
    {
       Country:" Belize - Municipal "
      ,City:"Belize City"
      ,Code:"TZA"
    },
    {
       Country:" BC "
      ,City:"Bella Bella"
      ,Code:"ZEL"
    },
    {
       Country:" BC "
      ,City:"Bella Coola"
      ,Code:"QBC"
    },
    {
       Country:" IL "
      ,City:"Belleville"
      ,Code:"BLV"
    },
    {
       Country:" ON - Rail service "
      ,City:"Belleville"
      ,Code:"XVV"
    },
    {
       Country:" WA "
      ,City:"Bellingham"
      ,Code:"BLI"
    },
    {
       Country:" Solomon Islands "
      ,City:"Bellona"
      ,Code:"BNY"
    },
    {
       Country:" Brazil - Pampulha "
      ,City:"Belo Horizonte"
      ,Code:"PLU"
    },
    {
       Country:" Brazil - Tancredo Neves Intl. "
      ,City:"Belo Horizonte"
      ,Code:"CNF"
    },
    {
       Country:" Madagascar "
      ,City:"Belo"
      ,Code:"BMD"
    },
    {
       Country:" MN "
      ,City:"Bemidji"
      ,Code:"BJI"
    },
    {
       Country:" United Kingdom "
      ,City:"Benbecula"
      ,Code:"BEB"
    },
    {
       Country:" Libya "
      ,City:"Benghazi"
      ,Code:"BEN"
    },
    {
       Country:" Indonesia "
      ,City:"Bengkulu"
      ,Code:"BKS"
    },
    {
       Country:" MI "
      ,City:"Benton Harbor"
      ,Code:"BEH"
    },
    {
       Country:" Indonesia "
      ,City:"Berau"
      ,Code:"BEJ"
    },
    {
       Country:" Somalia "
      ,City:"Berbera"
      ,Code:"BBO"
    },
    {
       Country:" MB "
      ,City:"Berens River"
      ,Code:"YBV"
    },
    {
       Country:" Norway "
      ,City:"Bergen"
      ,Code:"BGO"
    },
    {
       Country:" France "
      ,City:"Bergerac"
      ,Code:"EGC"
    },
    {
       Country:" Norway "
      ,City:"Berlevag"
      ,Code:"BVG"
    },
    {
       Country:" Germany - All airports "
      ,City:"Berlin"
      ,Code:"BER"
    },
    {
       Country:" Germany - Schoenefeld "
      ,City:"Berlin"
      ,Code:"SXF"
    },
    {
       Country:" Germany - Tegel "
      ,City:"Berlin"
      ,Code:"TXL"
    },
    {
       Country:" Germany - Tempelhof "
      ,City:"Berlin"
      ,Code:"THF"
    },
    {
       Country:" Bermuda "
      ,City:"Bermuda"
      ,Code:"BDA"
    },
    {
       Country:" Switzerland - Belp Airport "
      ,City:"Berne"
      ,Code:"BRN"
    },
    {
       Country:" Switzerland - Rail service "
      ,City:"Berne"
      ,Code:"ZDJ"
    },
    {
       Country:" Madagascar "
      ,City:"Besalampy"
      ,Code:"BPY"
    },
    {
       Country:" AK "
      ,City:"Bethel"
      ,Code:"BET"
    },
    {
       Country:" PA "
      ,City:"Bethlehem"
      ,Code:"ABE"
    },
    {
       Country:" AK "
      ,City:"Bettles"
      ,Code:"BTT"
    },
    {
       Country:" France "
      ,City:"Beziers"
      ,Code:"BZR"
    },
    {
       Country:" Nepal "
      ,City:"Bhadrapur"
      ,Code:"BDP"
    },
    {
       Country:" Nepal "
      ,City:"Bhairawa"
      ,Code:"BWA"
    },
    {
       Country:" Myanmar "
      ,City:"Bhamo"
      ,Code:"BMO"
    },
    {
       Country:" Nepal "
      ,City:"Bharatpur"
      ,Code:"BHR"
    },
    {
       Country:" India "
      ,City:"Bhavnagar"
      ,Code:"BHU"
    },
    {
       Country:" India "
      ,City:"Bhopal"
      ,Code:"BHO"
    },
    {
       Country:" India "
      ,City:"Bhubaneswar"
      ,Code:"BBI"
    },
    {
       Country:" India "
      ,City:"Bhuj"
      ,Code:"BHJ"
    },
    {
       Country:" Indonesia "
      ,City:"Biak"
      ,Code:"BIK"
    },
    {
       Country:" France "
      ,City:"Biarritz"
      ,Code:"BIQ"
    },
    {
       Country:" ON "
      ,City:"Big Trout"
      ,Code:"YTL"
    },
    {
       Country:" Marshall Islands "
      ,City:"Bikini Atoll"
      ,Code:"BII"
    },
    {
       Country:" Spain "
      ,City:"Bilbao"
      ,Code:"BIO"
    },
    {
       Country:" MT "
      ,City:"Billings"
      ,Code:"BIL"
    },
    {
       Country:" Denmark "
      ,City:"Billund"
      ,Code:"BLL"
    },
    {
       Country:" MS "
      ,City:"Biloxi/Gulfport"
      ,Code:"GPT"
    },
    {
       Country:" Indonesia "
      ,City:"Bima"
      ,Code:"BMU"
    },
    {
       Country:" Bahamas "
      ,City:"Bimini"
      ,Code:"BIM"
    },
    {
       Country:" Bahamas "
      ,City:"Bimini"
      ,Code:"NSB"
    },
    {
       Country:" NY "
      ,City:"Binghamton"
      ,Code:"BGM"
    },
    {
       Country:" Malaysia "
      ,City:"Bintulu"
      ,Code:"BTU"
    },
    {
       Country:" Indonesia "
      ,City:"Bintuni"
      ,Code:"NTI"
    },
    {
       Country:" Nepal "
      ,City:"Biratragar"
      ,Code:"BIR"
    },
    {
       Country:" AK "
      ,City:"Birch Creek"
      ,Code:"KBC"
    },
    {
       Country:" Australia "
      ,City:"Birdsville"
      ,Code:"BVI"
    },
    {
       Country:" AL "
      ,City:"Birmingham"
      ,Code:"BHM"
    },
    {
       Country:" United Kingdom "
      ,City:"Birmingham"
      ,Code:"BHX"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Bisha"
      ,Code:"BHH"
    },
    {
       Country:" Kyrgyzstan "
      ,City:"Bishkek"
      ,Code:"FRU"
    },
    {
       Country:" Algeria "
      ,City:"Biskra"
      ,Code:"BSK"
    },
    {
       Country:" ND "
      ,City:"Bismarck"
      ,Code:"BIS"
    },
    {
       Country:" Guinea-Bissau "
      ,City:"Bissau"
      ,Code:"OXB"
    },
    {
       Country:" NL "
      ,City:"Black Tickle"
      ,Code:"YBI"
    },
    {
       Country:" Australia "
      ,City:"Blackall"
      ,Code:"BKQ"
    },
    {
       Country:" United Kingdom "
      ,City:"Blackpool"
      ,Code:"BLK"
    },
    {
       Country:" Australia "
      ,City:"Blackwater"
      ,Code:"BLT"
    },
    {
       Country:" Russia "
      ,City:"Blagoveschensk"
      ,Code:"BQS"
    },
    {
       Country:" QC "
      ,City:"Blanc Sablon"
      ,Code:"YBX"
    },
    {
       Country:" Malawi "
      ,City:"Blantyre"
      ,Code:"BLZ"
    },
    {
       Country:" New Zealand "
      ,City:"Blenheim"
      ,Code:"BHE"
    },
    {
       Country:" Brazil "
      ,City:"Blo Horizonte"
      ,Code:"CNF"
    },
    {
       Country:" RI "
      ,City:"Block Island"
      ,Code:"BID"
    },
    {
       Country:" South Africa "
      ,City:"Bloemfontein"
      ,Code:"BFN"
    },
    {
       Country:" IL "
      ,City:"Bloomington"
      ,Code:"BMI"
    },
    {
       Country:" WV "
      ,City:"Bluefield"
      ,Code:"BLF"
    },
    {
       Country:" Cape Verde "
      ,City:"Boa Vista"
      ,Code:"BVC"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Boang"
      ,Code:"BOV"
    },
    {
       Country:" Brazil "
      ,City:"Boavista"
      ,Code:"BVB"
    },
    {
       Country:" Panama "
      ,City:"Bocas Del Toro"
      ,Code:"BOC"
    },
    {
       Country:" Norway "
      ,City:"Bodo"
      ,Code:"BOO"
    },
    {
       Country:" Turkey "
      ,City:"Bodrum"
      ,Code:"BJV"
    },
    {
       Country:" Colombia "
      ,City:"Bogota"
      ,Code:"BOG"
    },
    {
       Country:" Australia "
      ,City:"Boiju Island"
      ,Code:"GIC"
    },
    {
       Country:" ID "
      ,City:"Boise"
      ,Code:"BOI"
    },
    {
       Country:" Iran "
      ,City:"Bojnord"
      ,Code:"BJB"
    },
    {
       Country:" Indonesia "
      ,City:"Bokondini"
      ,Code:"BUI"
    },
    {
       Country:" Croatia "
      ,City:"Bol"
      ,Code:"BWK"
    },
    {
       Country:" Italy "
      ,City:"Bolzano"
      ,Code:"BZO"
    },
    {
       Country:" Congo "
      ,City:"Boma"
      ,Code:"BOA"
    },
    {
       Country:" India "
      ,City:"Bombay"
      ,Code:"BOM"
    },
    {
       Country:" Netherlands Antilles "
      ,City:"Bonaire"
      ,Code:"BON"
    },
    {
       Country:" QC "
      ,City:"Bonaventure"
      ,Code:"YVB"
    },
    {
       Country:" Germany "
      ,City:"Bonn"
      ,Code:"BNJ"
    },
    {
       Country:" French Polynesia "
      ,City:"Bora Bora"
      ,Code:"BOB"
    },
    {
       Country:" France "
      ,City:"Bordeaux"
      ,Code:"BOD"
    },
    {
       Country:" Egypt "
      ,City:"Borg El Arab"
      ,Code:"HBE"
    },
    {
       Country:" Germany "
      ,City:"Borkum"
      ,Code:"BMK"
    },
    {
       Country:" Sweden "
      ,City:"Borlange"
      ,Code:"BLE"
    },
    {
       Country:" Denmark "
      ,City:"Bornholm"
      ,Code:"RNN"
    },
    {
       Country:" Australia "
      ,City:"Borroloola"
      ,Code:"BOX"
    },
    {
       Country:" Somalia "
      ,City:"Bossaro"
      ,Code:"BSA"
    },
    {
       Country:" MA "
      ,City:"Boston"
      ,Code:"BOS"
    },
    {
       Country:" CO - Bus service "
      ,City:"Boulder"
      ,Code:"XHH"
    },
    {
       Country:" CO - Hiltons Har H "
      ,City:"Boulder"
      ,Code:"WHH"
    },
    {
       Country:" CO - Municipal Airport "
      ,City:"Boulder"
      ,Code:"WBU"
    },
    {
       Country:" Australia "
      ,City:"Boulia"
      ,Code:"BQL"
    },
    {
       Country:" AK "
      ,City:"Boundary"
      ,Code:"BYA"
    },
    {
       Country:" Bulgaria "
      ,City:"Bourgas"
      ,Code:"BOJ"
    },
    {
       Country:" Australia "
      ,City:"Bourke"
      ,Code:"BRK"
    },
    {
       Country:" United Kingdom "
      ,City:"Bournemouth"
      ,Code:"BOH"
    },
    {
       Country:" KY "
      ,City:"Bowling Green"
      ,Code:"BWG"
    },
    {
       Country:" MT "
      ,City:"Bozeman"
      ,Code:"BZN"
    },
    {
       Country:" Libya "
      ,City:"Brack"
      ,Code:"BCQ"
    },
    {
       Country:" PA "
      ,City:"Bradford"
      ,Code:"BFD"
    },
    {
       Country:" MN "
      ,City:"Brainerd"
      ,Code:"BRD"
    },
    {
       Country:" Australia "
      ,City:"Brampton Island"
      ,Code:"BMP"
    },
    {
       Country:" ON - Rail service "
      ,City:"Brampton"
      ,Code:"XPN"
    },
    {
       Country:" MB "
      ,City:"Brandon"
      ,Code:"YBR"
    },
    {
       Country:" ON - Rail service "
      ,City:"Brantford"
      ,Code:"XFV"
    },
    {
       Country:" Brazil "
      ,City:"Brasilia"
      ,Code:"BSB"
    },
    {
       Country:" Slovakia "
      ,City:"Bratislava"
      ,Code:"BTS"
    },
    {
       Country:" Russia "
      ,City:"Bratsk"
      ,Code:"BTK"
    },
    {
       Country:" Denmark "
      ,City:"Braunschweig"
      ,Code:"BWE"
    },
    {
       Country:" TX "
      ,City:"Brawnwood"
      ,Code:"BWD"
    },
    {
       Country:" Congo "
      ,City:"Brazzaville"
      ,Code:"BZV"
    },
    {
       Country:" CO - Van service "
      ,City:"Breckenridge"
      ,Code:"QKB"
    },
    {
       Country:" Germany "
      ,City:"Bremen"
      ,Code:"BRE"
    },
    {
       Country:" France "
      ,City:"Brest"
      ,Code:"BES"
    },
    {
       Country:" Australia "
      ,City:"Brewarrina"
      ,Code:"BWQ"
    },
    {
       Country:" Barbados "
      ,City:"Bridgetown"
      ,Code:"BGI"
    },
    {
       Country:" Italy "
      ,City:"Brindisi"
      ,Code:"BDS"
    },
    {
       Country:" Australia "
      ,City:"Brisbane"
      ,Code:"BNE"
    },
    {
       Country:" United Kingdom "
      ,City:"Bristol"
      ,Code:"BRS"
    },
    {
       Country:" VA "
      ,City:"Bristol"
      ,Code:"TRI"
    },
    {
       Country:" France - Laroche"
      ,City:"Brive-La-Gaillarde"
      ,Code:"BVE"
    },
    {
       Country:" Czech Republic - Bus service "
      ,City:"Brno"
      ,Code:"ZDN"
    },
    {
       Country:" Czech Republic - Turany "
      ,City:"Brno"
      ,Code:"BRQ"
    },
    {
       Country:" MB "
      ,City:"Brochet"
      ,Code:"YBT"
    },
    {
       Country:" ON "
      ,City:"Brockville"
      ,Code:"XBR"
    },
    {
       Country:" Australia "
      ,City:"Broken Hill"
      ,Code:"BHQ"
    },
    {
       Country:" Norway "
      ,City:"Bronnoysund"
      ,Code:"BNN"
    },
    {
       Country:" SD "
      ,City:"Brookings"
      ,Code:"BKX"
    },
    {
       Country:" AK "
      ,City:"Brooks Lodge"
      ,Code:"RBH"
    },
    {
       Country:" Australia "
      ,City:"Broome"
      ,Code:"BME"
    },
    {
       Country:" TX "
      ,City:"Brownsville"
      ,Code:"BRO"
    },
    {
       Country:" GA "
      ,City:"Brunswick"
      ,Code:"BQK"
    },
    {
       Country:" Honduras "
      ,City:"Brus Laguna"
      ,Code:"BHG"
    },
    {
       Country:" Belgium - National "
      ,City:"Brussels"
      ,Code:"BRU"
    },
    {
       Country:" Belgium - Rail service "
      ,City:"Brussels"
      ,Code:"ZYR"
    },
    {
       Country:" Belguim - Charleroi "
      ,City:"Brussels"
      ,Code:"CRL"
    },
    {
       Country:" Colombia "
      ,City:"Bucaramanga"
      ,Code:"BGA"
    },
    {
       Country:" Romania - Baneasa "
      ,City:"Bucharest"
      ,Code:"BBU"
    },
    {
       Country:" Romania - Otopeni International "
      ,City:"Bucharest"
      ,Code:"OTP"
    },
    {
       Country:" AK "
      ,City:"Buckland"
      ,Code:"BKC"
    },
    {
       Country:" Hungary "
      ,City:"Budapest"
      ,Code:"BUD"
    },
    {
       Country:" Argentina - Jorge Newbery "
      ,City:"Buenos Aires"
      ,Code:"AEP"
    },
    {
       Country:" Argentina - Ministro Pistarini "
      ,City:"Buenos Aires"
      ,Code:"EZE"
    },
    {
       Country:" NY "
      ,City:"Buffalo"
      ,Code:"BUF"
    },
    {
       Country:" Russia "
      ,City:"Bugulma"
      ,Code:"UUA"
    },
    {
       Country:" Burundi "
      ,City:"Bujumbura"
      ,Code:"BJM"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Buka"
      ,Code:"BUA"
    },
    {
       Country:" Uzbekistan "
      ,City:"Bukhara"
      ,Code:"BHK"
    },
    {
       Country:" Malaysia "
      ,City:"Bukoba"
      ,Code:"BKZ"
    },
    {
       Country:" Zimbabwe "
      ,City:"Bulawayo"
      ,Code:"BUQ"
    },
    {
       Country:" Russia "
      ,City:"Bulgulma"
      ,Code:"UUA"
    },
    {
       Country:" AZ "
      ,City:"Bullhead City/Laughlin"
      ,Code:"IFP"
    },
    {
       Country:" Australia "
      ,City:"Bundaberg"
      ,Code:"BDB"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Bunsil"
      ,Code:"BXZ"
    },
    {
       Country:" Somalia "
      ,City:"Burao"
      ,Code:"BUO"
    },
    {
       Country:" CA "
      ,City:"Burbank"
      ,Code:"BUR"
    },
    {
       Country:" Fiji "
      ,City:"Bureta"
      ,Code:"LEV"
    },
    {
       Country:" Thailand "
      ,City:"Buri Ram"
      ,Code:"BFV"
    },
    {
       Country:" Australia "
      ,City:"Burketown"
      ,Code:"BUC"
    },
    {
       Country:" IA "
      ,City:"Burlington"
      ,Code:"BRL"
    },
    {
       Country:" VT "
      ,City:"Burlington"
      ,Code:"BTV"
    },
    {
       Country:" Australia "
      ,City:"Burnie"
      ,Code:"BWT"
    },
    {
       Country:" BC "
      ,City:"Burns Lake"
      ,Code:"YPZ"
    },
    {
       Country:" South Korea - Gimhae "
      ,City:"Busan"
      ,Code:"PUS"
    },
    {
       Country:" MT "
      ,City:"Butte"
      ,Code:"BTM"
    },
    {
       Country:" Philippines "
      ,City:"Butuan"
      ,Code:"BXU"
    },
    {
       Country:" Poland "
      ,City:"Bydgoszcz"
      ,Code:"BZG"
    },
    {
       Country:" Mexico "
      ,City:"Cabo San Lucas"
      ,Code:"SJD"
    },
    {
       Country:" France "
      ,City:"Caen"
      ,Code:"CFR"
    },
    {
       Country:" Philippines - Lumbia "
      ,City:"Cagayan De Oro"
      ,Code:"CGY"
    },
    {
       Country:" Italy "
      ,City:"Cagliari"
      ,Code:"CAG"
    },
    {
       Country:" Australia "
      ,City:"Cairns"
      ,Code:"CNS"
    },
    {
       Country:" Egypt "
      ,City:"Cairo"
      ,Code:"CAI"
    },
    {
       Country:" Peru "
      ,City:"Cajamarca"
      ,Code:"CJA"
    },
    {
       Country:" Nigeria "
      ,City:"Calabar"
      ,Code:"CBQ"
    },
    {
       Country:" Chile "
      ,City:"Calama"
      ,Code:"CJC"
    },
    {
       Country:" India "
      ,City:"Calcutta"
      ,Code:"CCU"
    },
    {
       Country:" AB "
      ,City:"Calgary"
      ,Code:"YYC"
    },
    {
       Country:" Colombia "
      ,City:"Cali"
      ,Code:"CLO"
    },
    {
       Country:" France "
      ,City:"Calvi"
      ,Code:"CLY"
    },
    {
       Country:" Cuba "
      ,City:"Camaguey"
      ,Code:"CMW"
    },
    {
       Country:" NU "
      ,City:"Cambridge Bay"
      ,Code:"YCB"
    },
    {
       Country:" United Kingdom "
      ,City:"Cambridge"
      ,Code:"CBG"
    },
    {
       Country:" Argentina "
      ,City:"Camodoro"
      ,Code:"CRD"
    },
    {
       Country:" BC "
      ,City:"Campbell River"
      ,Code:"YBL"
    },
    {
       Country:" NB - Rail service "
      ,City:"Campbellton"
      ,Code:"XAZ"
    },
    {
       Country:" United Kingdom "
      ,City:"Campbeltown"
      ,Code:"CAL"
    },
    {
       Country:" Mexico "
      ,City:"Campeche"
      ,Code:"CPE"
    },
    {
       Country:" Brazil "
      ,City:"Campina Grande"
      ,Code:"CPV"
    },
    {
       Country:" Brazil "
      ,City:"Campinas"
      ,Code:"CPQ"
    },
    {
       Country:" Brazil "
      ,City:"Campo Grande"
      ,Code:"CGR"
    },
    {
       Country:" Brazil "
      ,City:"Campos"
      ,Code:"CAW"
    },
    {
       Country:" Venezuela "
      ,City:"Canaima"
      ,Code:"CAS"
    },
    {
       Country:" Australia "
      ,City:"Canberra"
      ,Code:"CBR"
    },
    {
       Country:" Mexico "
      ,City:"Cancun"
      ,Code:"CUN"
    },
    {
       Country:" France - Coisette Heliport "
      ,City:"Cannes"
      ,Code:"JCA"
    },
    {
       Country:" France - Mandelieu "
      ,City:"Cannes"
      ,Code:"CEQ"
    },
    {
       Country:" France - Vieux Port "
      ,City:"Cannes"
      ,Code:"QYW"
    },
    {
       Country:" Saint Vincent and the Grenadines "
      ,City:"Canouan"
      ,Code:"CIW"
    },
    {
       Country:" OH "
      ,City:"Canton/Akron"
      ,Code:"CAK"
    },
    {
       Country:" Haiti "
      ,City:"Cap Haitien"
      ,Code:"CAP"
    },
    {
       Country:" NU "
      ,City:"Cape Dorset"
      ,Code:"YTE"
    },
    {
       Country:" MO "
      ,City:"Cape Girardeau"
      ,Code:"CGI"
    },
    {
       Country:" AK "
      ,City:"Cape Lisburne"
      ,Code:"LUR"
    },
    {
       Country:" AK "
      ,City:"Cape Newenham"
      ,Code:"EHM"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Cape Orford"
      ,Code:"CPI"
    },
    {
       Country:" South Africa "
      ,City:"Cape Town"
      ,Code:"CPT"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Cape Vogel"
      ,Code:"CVL"
    },
    {
       Country:" ON - Rail service "
      ,City:"Capreol"
      ,Code:"XAW"
    },
    {
       Country:" Venezuela "
      ,City:"Caracas"
      ,Code:"CCS"
    },
    {
       Country:" Brazil "
      ,City:"Carajas"
      ,Code:"CKS"
    },
    {
       Country:" IL "
      ,City:"Carbondale"
      ,Code:"MDH"
    },
    {
       Country:" France "
      ,City:"Carcassonne"
      ,Code:"CCF"
    },
    {
       Country:" United Kingdom "
      ,City:"Cardiff"
      ,Code:"CWL"
    },
    {
       Country:" CA "
      ,City:"Carlsbad"
      ,Code:"CLD"
    },
    {
       Country:" NM "
      ,City:"Carlsbad"
      ,Code:"CNM"
    },
    {
       Country:" CA "
      ,City:"Carmel"
      ,Code:"MRY"
    },
    {
       Country:" Australia "
      ,City:"Carnarvon"
      ,Code:"CVQ"
    },
    {
       Country:" Costa Rica "
      ,City:"Carrillo"
      ,Code:"RIK"
    },
    {
       Country:" Colombia "
      ,City:"Cartagena"
      ,Code:"CTG"
    },
    {
       Country:" NL "
      ,City:"Cartwright"
      ,Code:"YRF"
    },
    {
       Country:" Venezuela "
      ,City:"Carupani"
      ,Code:"CUP"
    },
    {
       Country:" Morocco - Anfa "
      ,City:"Casablanca"
      ,Code:"CAS"
    },
    {
       Country:" Morocco - Mohamed V "
      ,City:"Casablanca"
      ,Code:"CMN"
    },
    {
       Country:" Brazil "
      ,City:"Cascavel"
      ,Code:"CAC"
    },
    {
       Country:" Australia "
      ,City:"Casino"
      ,Code:"CSI"
    },
    {
       Country:" WY "
      ,City:"Casper"
      ,Code:"CPR"
    },
    {
       Country:" ON - Rail service "
      ,City:"Casselman"
      ,Code:"XZB"
    },
    {
       Country:" Fiji "
      ,City:"Castaway"
      ,Code:"CST"
    },
    {
       Country:" BC "
      ,City:"Castlegar"
      ,Code:"YCG"
    },
    {
       Country:" France "
      ,City:"Castres"
      ,Code:"DCM"
    },
    {
       Country:" ON "
      ,City:"Cat Lake"
      ,Code:"YAC"
    },
    {
       Country:" Argentina "
      ,City:"Catamarca"
      ,Code:"CTC"
    },
    {
       Country:" Italy "
      ,City:"Catania"
      ,Code:"CTA"
    },
    {
       Country:" Colombia "
      ,City:"Caucasia"
      ,Code:"CAQ"
    },
    {
       Country:" Brazil "
      ,City:"Caxias Do Sul"
      ,Code:"CXJ"
    },
    {
       Country:" French Guiana "
      ,City:"Cayenne"
      ,Code:"CAY"
    },
    {
       Country:" Cambodia "
      ,City:"Cayman Brac Is"
      ,Code:"CYB"
    },
    {
       Country:" Cuba "
      ,City:"Cayo Largo Del Sur"
      ,Code:"CYO"
    },
    {
       Country:" Philippines - Matan International "
      ,City:"Cebu"
      ,Code:"CEB"
    },
    {
       Country:" UT "
      ,City:"Cedar City"
      ,Code:"CDC"
    },
    {
       Country:" IA "
      ,City:"Cedar Rapids"
      ,Code:"CID"
    },
    {
       Country:" Australia "
      ,City:"Cedun"
      ,Code:"CED"
    },
    {
       Country:" AK "
      ,City:"Central"
      ,Code:"CEM"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Ceuta"
      ,Code:"JCU"
    },
    {
       Country:" NE "
      ,City:"Chadron"
      ,Code:"CDR"
    },
    {
       Country:" Iran "
      ,City:"Chah-Bahar"
      ,Code:"ZBR"
    },
    {
       Country:" AK "
      ,City:"Chalkyitsik"
      ,Code:"CIK"
    },
    {
       Country:" France "
      ,City:"Chambery"
      ,Code:"CMF"
    },
    {
       Country:" QC - Rail service "
      ,City:"Chambord"
      ,Code:"XCI"
    },
    {
       Country:" IL "
      ,City:"Champaign/Urbana"
      ,Code:"CMI"
    },
    {
       Country:" India "
      ,City:"Chandigarh"
      ,Code:"IXC"
    },
    {
       Country:" QC - Rail service "
      ,City:"Chandler"
      ,Code:"XDL"
    },
    {
       Country:" China "
      ,City:"Changchun"
      ,Code:"CGQ"
    },
    {
       Country:" China "
      ,City:"Changde"
      ,Code:"CGD"
    },
    {
       Country:" Panama "
      ,City:"Changuinda"
      ,Code:"CHX"
    },
    {
       Country:" China "
      ,City:"Changzhou"
      ,Code:"CZX"
    },
    {
       Country:" Greece "
      ,City:"Chania"
      ,Code:"CHQ"
    },
    {
       Country:" China "
      ,City:"Chaoyang"
      ,Code:"CHG"
    },
    {
       Country:" Brazil "
      ,City:"Chapeco"
      ,Code:"XAP"
    },
    {
       Country:" ON "
      ,City:"Chapleau"
      ,Code:"YLD"
    },
    {
       Country:" SC "
      ,City:"Charleston"
      ,Code:"CHS"
    },
    {
       Country:" WV "
      ,City:"Charleston"
      ,Code:"CRW"
    },
    {
       Country:" Australia "
      ,City:"Charleville"
      ,Code:"CTL"
    },
    {
       Country:" NC "
      ,City:"Charlotte"
      ,Code:"CLT"
    },
    {
       Country:" VA "
      ,City:"Charlottesville"
      ,Code:"CHO"
    },
    {
       Country:" NL "
      ,City:"Charlottetown"
      ,Code:"YHG"
    },
    {
       Country:" PE "
      ,City:"Charlottetown"
      ,Code:"YYG"
    },
    {
       Country:" New Zealand "
      ,City:"Chatham Island"
      ,Code:"CHT"
    },
    {
       Country:" ON "
      ,City:"Chatham"
      ,Code:"XCM"
    },
    {
       Country:" TN "
      ,City:"Chattanooga"
      ,Code:"CHA"
    },
    {
       Country:" Russia "
      ,City:"Cheboksary"
      ,Code:"CSY"
    },
    {
       Country:" AK "
      ,City:"Chefornak"
      ,Code:"CYF"
    },
    {
       Country:" Russia "
      ,City:"Chelybinsk"
      ,Code:"CEK"
    },
    {
       Country:" BC - Rail service "
      ,City:"Chemainus"
      ,Code:"XHS"
    },
    {
       Country:" India "
      ,City:"Chennai"
      ,Code:"MAA"
    },
    {
       Country:" South Korea "
      ,City:"Cheongju"
      ,Code:"CJJ"
    },
    {
       Country:" Russia "
      ,City:"Cherepovets"
      ,Code:"CEE"
    },
    {
       Country:" China "
      ,City:"Chergdu"
      ,Code:"CTU"
    },
    {
       Country:" United Kingdom "
      ,City:"Chester"
      ,Code:"CEG"
    },
    {
       Country:" NU "
      ,City:"Chesterfield Inlet"
      ,Code:"YCS"
    },
    {
       Country:" Mexico "
      ,City:"Chetumal"
      ,Code:"CTM"
    },
    {
       Country:" AK "
      ,City:"Chevak"
      ,Code:"VAK"
    },
    {
       Country:" Russia "
      ,City:"Chevepovets"
      ,Code:"CEE"
    },
    {
       Country:" QC "
      ,City:"Chevery"
      ,Code:"YHR"
    },
    {
       Country:" WY "
      ,City:"Cheyenne"
      ,Code:"CYS"
    },
    {
       Country:" Taiwan "
      ,City:"Chi Mei"
      ,Code:"CMJ"
    },
    {
       Country:" Thailand "
      ,City:"Chiang Mai"
      ,Code:"CNX"
    },
    {
       Country:" Thailand "
      ,City:"Chiang Rai"
      ,Code:"CEI"
    },
    {
       Country:" Taiwan "
      ,City:"Chiayi"
      ,Code:"CYI"
    },
    {
       Country:" QC "
      ,City:"Chibougamau"
      ,Code:"YMT"
    },
    {
       Country:" IL - All airports "
      ,City:"Chicago"
      ,Code:"CHI"
    },
    {
       Country:" IL - Midway "
      ,City:"Chicago"
      ,Code:"MDW"
    },
    {
       Country:" IL - O'Hare "
      ,City:"Chicago"
      ,Code:"ORD"
    },
    {
       Country:" Peru "
      ,City:"Chicayo"
      ,Code:"CIX"
    },
    {
       Country:" AK "
      ,City:"Chicken"
      ,Code:"CKX"
    },
    {
       Country:" CA "
      ,City:"Chico"
      ,Code:"CIC"
    },
    {
       Country:" China "
      ,City:"Chifeng"
      ,Code:"CIF"
    },
    {
       Country:" AK - "
      ,City:"Chignik"
      ,Code:"KCQ"
    },
    {
       Country:" AK - Fisheries "
      ,City:"Chignik"
      ,Code:"KCG"
    },
    {
       Country:" AK - Lagoon "
      ,City:"Chignik"
      ,Code:"KCL"
    },
    {
       Country:" Mexico "
      ,City:"Chihuahua"
      ,Code:"CUU"
    },
    {
       Country:" Chile "
      ,City:"Chillan"
      ,Code:"YAI"
    },
    {
       Country:" Zambia "
      ,City:"Chipata"
      ,Code:"CIP"
    },
    {
       Country:" AK "
      ,City:"Chisana"
      ,Code:"CZN"
    },
    {
       Country:" QC "
      ,City:"Chisasibi"
      ,Code:"YKU"
    },
    {
       Country:" MN "
      ,City:"Chisholm/Hibbing"
      ,Code:"HIB"
    },
    {
       Country:" Republic of Moldova "
      ,City:"Chisinau"
      ,Code:"KIV"
    },
    {
       Country:" Russia "
      ,City:"Chita"
      ,Code:"HTA"
    },
    {
       Country:" Pakistan "
      ,City:"Chitral"
      ,Code:"CJL"
    },
    {
       Country:" Panama "
      ,City:"Chitre"
      ,Code:"CTD"
    },
    {
       Country:" Bangladesh "
      ,City:"Chittagong"
      ,Code:"CGP"
    },
    {
       Country:" Solomon Islands "
      ,City:"Choiseul Bay"
      ,Code:"CHY"
    },
    {
       Country:" China "
      ,City:"Chongqing"
      ,Code:"CKG"
    },
    {
       Country:" New Zealand "
      ,City:"Christchurch"
      ,Code:"CHC"
    },
    {
       Country:" Christmas Island "
      ,City:"Christmas Island"
      ,Code:"XCH"
    },
    {
       Country:" AK "
      ,City:"Chuathbaluk"
      ,Code:"CHU"
    },
    {
       Country:" NL "
      ,City:"Churchill Falls"
      ,Code:"ZUM"
    },
    {
       Country:" MB "
      ,City:"Churchill"
      ,Code:"YYQ"
    },
    {
       Country:" MB - Rail service "
      ,City:"Churchill"
      ,Code:"XAD"
    },
    {
       Country:" Fiji "
      ,City:"Cicia"
      ,Code:"ICI"
    },
    {
       Country:" Cuba "
      ,City:"Ciego De Avila"
      ,Code:"AVI"
    },
    {
       Country:" OH "
      ,City:"Cincinnati"
      ,Code:"CVG"
    },
    {
       Country:" AK "
      ,City:"Circle Hot Springs"
      ,Code:"CHP"
    },
    {
       Country:" AK "
      ,City:"Circle"
      ,Code:"IRC"
    },
    {
       Country:" Venezuela "
      ,City:"Ciudad Bolivar"
      ,Code:"CBL"
    },
    {
       Country:" Mexico "
      ,City:"Ciudad Del Carmen"
      ,Code:"CME"
    },
    {
       Country:" Paraguay "
      ,City:"Ciudad del Este"
      ,Code:"AGT"
    },
    {
       Country:" Mexico "
      ,City:"Ciudad Juarez"
      ,Code:"CJS"
    },
    {
       Country:" Mexico "
      ,City:"Ciudad Obregon"
      ,Code:"CEN"
    },
    {
       Country:" Mexico "
      ,City:"Ciudad Victoria"
      ,Code:"CVM"
    },
    {
       Country:" AK "
      ,City:"Clarks Point"
      ,Code:"CLP"
    },
    {
       Country:" WV "
      ,City:"Clarksburg"
      ,Code:"CKB"
    },
    {
       Country:" FL "
      ,City:"Clearwater/St Petersburg"
      ,Code:"PIE"
    },
    {
       Country:" France "
      ,City:"Clermont-ferrand"
      ,Code:"CFE"
    },
    {
       Country:" Australia "
      ,City:"Cleve"
      ,Code:"CVC"
    },
    {
       Country:" OH "
      ,City:"Cleveland"
      ,Code:"CLE"
    },
    {
       Country:" Australia "
      ,City:"Cloncurry"
      ,Code:"CNJ"
    },
    {
       Country:" NM "
      ,City:"Clovis"
      ,Code:"CVN"
    },
    {
       Country:" Malawi "
      ,City:"Club Makokola"
      ,Code:"CMK"
    },
    {
       Country:" Romania "
      ,City:"Cluj"
      ,Code:"CLJ"
    },
    {
       Country:" NU "
      ,City:"Clyde River"
      ,Code:"YCY"
    },
    {
       Country:" Australia "
      ,City:"Cobar"
      ,Code:"CAZ"
    },
    {
       Country:" Bolivia "
      ,City:"Cobija"
      ,Code:"CIJ"
    },
    {
       Country:" ON - Rail service "
      ,City:"Cobourg"
      ,Code:"XGJ"
    },
    {
       Country:" Bolivia "
      ,City:"Cochabamba"
      ,Code:"CBB"
    },
    {
       Country:" India "
      ,City:"Cochin"
      ,Code:"COK"
    },
    {
       Country:" Australia "
      ,City:"Coconut Island"
      ,Code:"CNC"
    },
    {
       Country:" Cocos "
      ,City:"Cocos Islands"
      ,Code:"Keeling"
    },
    {
       Country:" WY "
      ,City:"Cody/Yellowstone"
      ,Code:"COD"
    },
    {
       Country:" Australia "
      ,City:"Coen"
      ,Code:"CUQ"
    },
    {
       Country:" AK "
      ,City:"Coffee Point"
      ,Code:"CFA"
    },
    {
       Country:" AK "
      ,City:"Coffman Cove"
      ,Code:"KCC"
    },
    {
       Country:" Australia "
      ,City:"Coffs Harbor"
      ,Code:"CFS"
    },
    {
       Country:" India "
      ,City:"Coimbatore"
      ,Code:"CJB"
    },
    {
       Country:" AK "
      ,City:"Cold Bay"
      ,Code:"CDB"
    },
    {
       Country:" Mexico "
      ,City:"Colima"
      ,Code:"CLQ"
    },
    {
       Country:" TX "
      ,City:"College Station"
      ,Code:"CLL"
    },
    {
       Country:" Germany - Cologne/Bonn "
      ,City:"Cologne"
      ,Code:"CGN"
    },
    {
       Country:" Germany - Rail service "
      ,City:"Cologne"
      ,Code:"QKL"
    },
    {
       Country:" Sri Lanka "
      ,City:"Colombo"
      ,Code:"CMB"
    },
    {
       Country:" Panama "
      ,City:"Colon"
      ,Code:"ONX"
    },
    {
       Country:" CO "
      ,City:"Colorado Springs"
      ,Code:"COS"
    },
    {
       Country:" MO "
      ,City:"Columbia"
      ,Code:"COU"
    },
    {
       Country:" SC "
      ,City:"Columbia"
      ,Code:"CAE"
    },
    {
       Country:" GA "
      ,City:"Columbus"
      ,Code:"CSG"
    },
    {
       Country:" MS "
      ,City:"Columbus"
      ,Code:"GTR"
    },
    {
       Country:" OH "
      ,City:"Columbus"
      ,Code:"CMH"
    },
    {
       Country:" NT "
      ,City:"Colville Lake"
      ,Code:"YCK"
    },
    {
       Country:" BC "
      ,City:"Comox"
      ,Code:"YQQ"
    },
    {
       Country:" Guinea "
      ,City:"Conakry"
      ,Code:"CKY"
    },
    {
       Country:" Chile "
      ,City:"Concepcion"
      ,Code:"CCP"
    },
    {
       Country:" CA "
      ,City:"Concord"
      ,Code:"CCR"
    },
    {
       Country:" Argentina "
      ,City:"Concordia"
      ,Code:"COC"
    },
    {
       Country:" KS "
      ,City:"Concordia"
      ,Code:"CNK"
    },
    {
       Country:" Colombia "
      ,City:"Condoto"
      ,Code:"COG"
    },
    {
       Country:" Romania "
      ,City:"Constanta"
      ,Code:"CND"
    },
    {
       Country:" Algeria "
      ,City:"Constantine"
      ,Code:"CZL"
    },
    {
       Country:" Panama "
      ,City:"Contadora"
      ,Code:"OTD"
    },
    {
       Country:" Australia "
      ,City:"Coober Pedy"
      ,Code:"CPD"
    },
    {
       Country:" Australia "
      ,City:"Cooktown"
      ,Code:"CTN"
    },
    {
       Country:" Australia "
      ,City:"Cooma"
      ,Code:"OOM"
    },
    {
       Country:" Australia "
      ,City:"Coonamble"
      ,Code:"CNB"
    },
    {
       Country:" Denmark "
      ,City:"Copenhagen"
      ,Code:"CPH"
    },
    {
       Country:" Chile "
      ,City:"Copiapo"
      ,Code:"CPO"
    },
    {
       Country:" CO - Van service "
      ,City:"Copper Mountain"
      ,Code:"QCE"
    },
    {
       Country:" NU "
      ,City:"Coral Harbour"
      ,Code:"YZS"
    },
    {
       Country:" Argentina "
      ,City:"Cordoba"
      ,Code:"COR"
    },
    {
       Country:" AK "
      ,City:"Cordova"
      ,Code:"CDV"
    },
    {
       Country:" Ireland "
      ,City:"Cork"
      ,Code:"ORK"
    },
    {
       Country:" ON "
      ,City:"Cornwall"
      ,Code:"YCC"
    },
    {
       Country:" Venezuela "
      ,City:"Coro"
      ,Code:"CZE"
    },
    {
       Country:" Belize "
      ,City:"Corozal"
      ,Code:"CZH"
    },
    {
       Country:" TX "
      ,City:"Corpus Christi"
      ,Code:"CRP"
    },
    {
       Country:" Argentina "
      ,City:"Corrientes"
      ,Code:"CNQ"
    },
    {
       Country:" CO "
      ,City:"Cortez"
      ,Code:"CEZ"
    },
    {
       Country:" Brazil "
      ,City:"Corumba"
      ,Code:"CMG"
    },
    {
       Country:" Portugal "
      ,City:"Corvo Island"
      ,Code:"CVU"
    },
    {
       Country:" Philippines "
      ,City:"Cotabato"
      ,Code:"CBO"
    },
    {
       Country:" Benin "
      ,City:"Cotarou"
      ,Code:"COC"
    },
    {
       Country:" QC - Rail service "
      ,City:"Coteau"
      ,Code:"XGK"
    },
    {
       Country:" BC "
      ,City:"Courtenay"
      ,Code:"YCA"
    },
    {
       Country:" Bangladesh "
      ,City:"Cox's Bazar"
      ,Code:"CXB"
    },
    {
       Country:" Mexico "
      ,City:"Cozumel"
      ,Code:"CZM"
    },
    {
       Country:" Vanuatu "
      ,City:"Craig Cove"
      ,Code:"CCV"
    },
    {
       Country:" AK "
      ,City:"Craig"
      ,Code:"CGA"
    },
    {
       Country:" BC "
      ,City:"Cranbrook"
      ,Code:"YXC"
    },
    {
       Country:" CA "
      ,City:"Crescent City"
      ,Code:"CEC"
    },
    {
       Country:" Brazil "
      ,City:"Criciuma"
      ,Code:"CCM"
    },
    {
       Country:" Australia "
      ,City:"Croker Island"
      ,Code:"CKI"
    },
    {
       Country:" AK "
      ,City:"Crooked Creek"
      ,Code:"CKO"
    },
    {
       Country:" Bahamas "
      ,City:"Crooked Island"
      ,Code:"CRI"
    },
    {
       Country:" MB "
      ,City:"Cross Lake"
      ,Code:"YCR"
    },
    {
       Country:" Italy "
      ,City:"Crotone"
      ,Code:"CRV"
    },
    {
       Country:" Brazil "
      ,City:"Cruzeiro Do Sul"
      ,Code:"CZS"
    },
    {
       Country:" AK "
      ,City:"Cube Cove"
      ,Code:"CUW"
    },
    {
       Country:" Colombia "
      ,City:"Cucata"
      ,Code:"CUC"
    },
    {
       Country:" Ecuador "
      ,City:"Cuenca"
      ,Code:"CUE"
    },
    {
       Country:" Mexico "
      ,City:"Cuernavaca"
      ,Code:"CVJ"
    },
    {
       Country:" Brazil "
      ,City:"Cuiaba"
      ,Code:"CGB"
    },
    {
       Country:" Mexico "
      ,City:"Culiacan"
      ,Code:"CUL"
    },
    {
       Country:" Venezuela "
      ,City:"Cumana"
      ,Code:"CUM"
    },
    {
       Country:" MD "
      ,City:"Cumberland"
      ,Code:"CBE"
    },
    {
       Country:" Australia "
      ,City:"Cunnamulla"
      ,Code:"CMA"
    },
    {
       Country:" Netherlands Antilles "
      ,City:"Curacao"
      ,Code:"CUR"
    },
    {
       Country:" Brazil "
      ,City:"Curitiba"
      ,Code:"CWB"
    },
    {
       Country:" Peru "
      ,City:"Cuzco"
      ,Code:"CUZ"
    },
    {
       Country:" Viet Nam "
      ,City:"Da Nang"
      ,Code:"DAD"
    },
    {
       Country:" Indonesia "
      ,City:"Dabra"
      ,Code:"DRH"
    },
    {
       Country:" South Korea "
      ,City:"Daegu"
      ,Code:"TAE"
    },
    {
       Country:" Senegal "
      ,City:"Dakar"
      ,Code:"DKR"
    },
    {
       Country:" Morocco "
      ,City:"Dakhla"
      ,Code:"VIL"
    },
    {
       Country:" Turkey "
      ,City:"Dalaman"
      ,Code:"DLM"
    },
    {
       Country:" Viet Nam - Lienkhang DLI)"
      ,City:"Dalat"
      ,Code:""
    },
    {
       Country:" China "
      ,City:"Dali City"
      ,Code:"DLU"
    },
    {
       Country:" China "
      ,City:"Dalian"
      ,Code:"DLC"
    },
    {
       Country:" TX - Dallas/Ft Worth Intl. "
      ,City:"Dallas"
      ,Code:"DFW"
    },
    {
       Country:" TX - Love Field "
      ,City:"Dallas"
      ,Code:"DAL"
    },
    {
       Country:" Syrian Arab Republic "
      ,City:"Damascus"
      ,Code:"DAM"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Dammam"
      ,Code:"DMM"
    },
    {
       Country:" Belize "
      ,City:"Dangriga"
      ,Code:"DGA"
    },
    {
       Country:" Tanzania "
      ,City:"Dar Es Salaam"
      ,Code:"DAR"
    },
    {
       Country:" Australia"
      ,City:"Darnley Island"
      ,Code:"NLF"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Daru"
      ,Code:"DAU"
    },
    {
       Country:" Australia "
      ,City:"Darwin"
      ,Code:"DRW"
    },
    {
       Country:" Indonesia "
      ,City:"Datadawai"
      ,Code:"DTD"
    },
    {
       Country:" MB "
      ,City:"Dauphin"
      ,Code:"YDN"
    },
    {
       Country:" Philipines - Mati "
      ,City:"Davao"
      ,Code:"DVO"
    },
    {
       Country:" Panama "
      ,City:"David"
      ,Code:"DAV"
    },
    {
       Country:" NL "
      ,City:"Davis Inlet"
      ,Code:"YDI"
    },
    {
       Country:" Myanmar "
      ,City:"Dawe"
      ,Code:"TVY"
    },
    {
       Country:" YT "
      ,City:"Dawson City"
      ,Code:"YDA"
    },
    {
       Country:" BC "
      ,City:"Dawson Creek"
      ,Code:"YDQ"
    },
    {
       Country:" China "
      ,City:"Daxian"
      ,Code:"DAX"
    },
    {
       Country:" China "
      ,City:"Dayang"
      ,Code:"DYG"
    },
    {
       Country:" Australia "
      ,City:"Daydream Is"
      ,Code:"DDI"
    },
    {
       Country:" OH "
      ,City:"Dayton"
      ,Code:"DAY"
    },
    {
       Country:" FL "
      ,City:"Daytona Beach"
      ,Code:"DAB"
    },
    {
       Country:" France "
      ,City:"Deauville"
      ,Code:"DOL"
    },
    {
       Country:" Ethiopia "
      ,City:"Debra Marcos"
      ,Code:"DBM"
    },
    {
       Country:" Ethiopia "
      ,City:"Debra Tabor"
      ,Code:"DBT"
    },
    {
       Country:" IL "
      ,City:"Decatur"
      ,Code:"DEC"
    },
    {
       Country:" NL "
      ,City:"Deer Lake"
      ,Code:"YDF"
    },
    {
       Country:" ON "
      ,City:"Deer Lake"
      ,Code:"YVZ"
    },
    {
       Country:" AK "
      ,City:"Deering"
      ,Code:"DRG"
    },
    {
       Country:" Syria - Al Jafrah "
      ,City:"Deirezzor"
      ,Code:"DEZ"
    },
    {
       Country:" TX "
      ,City:"Del Reo"
      ,Code:"DRT"
    },
    {
       Country:" India "
      ,City:"Delhi"
      ,Code:"DEL"
    },
    {
       Country:" NT "
      ,City:"Deline"
      ,Code:"YWJ"
    },
    {
       Country:" AK "
      ,City:"Delta Junction"
      ,Code:"DJN"
    },
    {
       Country:" Ethiopia "
      ,City:"Dembidollo"
      ,Code:"DEM"
    },
    {
       Country:" Australia "
      ,City:"Denham"
      ,Code:"DNM"
    },
    {
       Country:" Turkey "
      ,City:"Denizli"
      ,Code:"DNZ"
    },
    {
       Country:" Indonesia "
      ,City:"Denpasar Bali"
      ,Code:"DPS"
    },
    {
       Country:" CO - International "
      ,City:"Denver"
      ,Code:"DEN"
    },
    {
       Country:" CO - Longmont Bus service "
      ,City:"Denver"
      ,Code:"QWM"
    },
    {
       Country:" Pakistan "
      ,City:"Dera Ghazi"
      ,Code:"DEA"
    },
    {
       Country:" Pakistan "
      ,City:"Dera Ismail Khan"
      ,Code:"DSK"
    },
    {
       Country:" Australia "
      ,City:"Derby"
      ,Code:"DRB"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Derim"
      ,Code:"DER"
    },
    {
       Country:" IA "
      ,City:"Des Moines"
      ,Code:"DSM"
    },
    {
       Country:" Ethiopia "
      ,City:"Dessie"
      ,Code:"DSE"
    },
    {
       Country:" MI - All airports "
      ,City:"Detroit"
      ,Code:"DTT"
    },
    {
       Country:" MI - Metro/Wayne County "
      ,City:"Detroit"
      ,Code:"DTW"
    },
    {
       Country:" ND "
      ,City:"Devil's Lake"
      ,Code:"DVL"
    },
    {
       Country:" Australia "
      ,City:"Devonport"
      ,Code:"DPO"
    },
    {
       Country:" Bangledesh - Zia International "
      ,City:"Dhaka"
      ,Code:"DAC"
    },
    {
       Country:" India "
      ,City:"Dibrugarn"
      ,Code:"DIB"
    },
    {
       Country:" ND "
      ,City:"Dickinson"
      ,Code:"DIK"
    },
    {
       Country:" Viet Nam - Gialam "
      ,City:"Dien Bien Phu"
      ,Code:"DIN"
    },
    {
       Country:" France "
      ,City:"Dijon"
      ,Code:"DIJ"
    },
    {
       Country:" Indonesia "
      ,City:"Dili"
      ,Code:"DIL"
    },
    {
       Country:" AK "
      ,City:"Dillingham"
      ,Code:"DLG"
    },
    {
       Country:" Vanuata "
      ,City:"Dillons Bay"
      ,Code:"DLY"
    },
    {
       Country:" India "
      ,City:"Dimapur"
      ,Code:"DMU"
    },
    {
       Country:" France "
      ,City:"Dinard"
      ,Code:"DNR"
    },
    {
       Country:" Philippines "
      ,City:"Dipolog"
      ,Code:"DPL"
    },
    {
       Country:" Ethiopia "
      ,City:"Dire Dawa"
      ,Code:"DIR"
    },
    {
       Country:" India "
      ,City:"Div"
      ,Code:"DIU"
    },
    {
       Country:" Turkey "
      ,City:"Diyarbakir"
      ,Code:"DIY"
    },
    {
       Country:" Algeria "
      ,City:"Djanet"
      ,Code:"DJG"
    },
    {
       Country:" Tunisia "
      ,City:"Djerba"
      ,Code:"DJE"
    },
    {
       Country:" Djibouti "
      ,City:"Djibouti"
      ,Code:"JIB"
    },
    {
       Country:" Ukraine "
      ,City:"Dnepropetrovsk"
      ,Code:"DNK"
    },
    {
       Country:" Indonesia "
      ,City:"Dobo"
      ,Code:"DOB"
    },
    {
       Country:" KS "
      ,City:"Dodge City"
      ,Code:"DDC"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Dodoima"
      ,Code:"DDM"
    },
    {
       Country:" Tanzania "
      ,City:"Dodoma"
      ,Code:"DOD"
    },
    {
       Country:" Qatar "
      ,City:"Doha"
      ,Code:"DOH"
    },
    {
       Country:" Dominica - Cane Field "
      ,City:"Dominica"
      ,Code:"DCF"
    },
    {
       Country:" Dominica - Melville Hall "
      ,City:"Dominica"
      ,Code:"DOM"
    },
    {
       Country:" Ireland "
      ,City:"Donegal"
      ,Code:"CFN"
    },
    {
       Country:" Ukraine "
      ,City:"Donetsk"
      ,Code:"DOK"
    },
    {
       Country:" Sudan "
      ,City:"Dongola"
      ,Code:"DOG"
    },
    {
       Country:" Australia "
      ,City:"Doomadgee"
      ,Code:"DMD"
    },
    {
       Country:" Germany "
      ,City:"Dortmund"
      ,Code:"DTM"
    },
    {
       Country:" AL "
      ,City:"Dothan"
      ,Code:"DHN"
    },
    {
       Country:" Brazil "
      ,City:"Dourados"
      ,Code:"DOU"
    },
    {
       Country:" Cameroon "
      ,City:"Dovala"
      ,Code:"DLA"
    },
    {
       Country:" Germany "
      ,City:"Dresden"
      ,Code:"DRS"
    },
    {
       Country:" QC - Rail service "
      ,City:"Drummondville"
      ,Code:"XDM"
    },
    {
       Country:" ON "
      ,City:"Dryden"
      ,Code:"YHD"
    },
    {
       Country:" United Arab Emirates - Bus Station "
      ,City:"Dubai"
      ,Code:"XNB"
    },
    {
       Country:" United Arab Emirates - International "
      ,City:"Dubai"
      ,Code:"DXB"
    },
    {
       Country:" Australia "
      ,City:"Dubbo"
      ,Code:"DBO"
    },
    {
       Country:" Ireland "
      ,City:"Dublin"
      ,Code:"DUB"
    },
    {
       Country:" PA "
      ,City:"Dubois"
      ,Code:"DUJ"
    },
    {
       Country:" Croatia "
      ,City:"Dubrovnik"
      ,Code:"DBV"
    },
    {
       Country:" IA "
      ,City:"Dubuque"
      ,Code:"DBQ"
    },
    {
       Country:" MN "
      ,City:"Duluth"
      ,Code:"DLH"
    },
    {
       Country:" Philippines "
      ,City:"Dumaguete"
      ,Code:"DGT"
    },
    {
       Country:" Indonesia "
      ,City:"Dumai"
      ,Code:"DUM"
    },
    {
       Country:" BC "
      ,City:"Duncan/Quam"
      ,Code:"DUQ"
    },
    {
       Country:" United Kingdom "
      ,City:"Dundee"
      ,Code:"DND"
    },
    {
       Country:" New Zealand "
      ,City:"Dunedin"
      ,Code:"DUD"
    },
    {
       Country:" China "
      ,City:"Dunhuang"
      ,Code:"DNH"
    },
    {
       Country:" Australia "
      ,City:"Dunk Island"
      ,Code:"DKI"
    },
    {
       Country:" CO "
      ,City:"Durango"
      ,Code:"DRO"
    },
    {
       Country:" Mexico "
      ,City:"Durango"
      ,Code:"DGO"
    },
    {
       Country:" South Africa "
      ,City:"Durban"
      ,Code:"DUR"
    },
    {
       Country:" NC "
      ,City:"Durham"
      ,Code:"RDU"
    },
    {
       Country:" NC "
      ,City:"Durham/Raleigh"
      ,Code:"RDU"
    },
    {
       Country:" Tajikistan "
      ,City:"Dushanbe"
      ,Code:"DYU"
    },
    {
       Country:" Germany - International "
      ,City:"Dusseldorf"
      ,Code:"DUS"
    },
    {
       Country:" Germany - Moenchen-Gl. "
      ,City:"Dusseldorf"
      ,Code:"MGL"
    },
    {
       Country:" Germany - Rail service "
      ,City:"Dusseldorf"
      ,Code:"QDU"
    },
    {
       Country:" AK "
      ,City:"Dutch Harbor"
      ,Code:"DUT"
    },
    {
       Country:" Mayotte "
      ,City:"Dzaoudzi"
      ,Code:"DZA"
    },
    {
       Country:" South Africa "
      ,City:"East London"
      ,Code:"ELS"
    },
    {
       Country:" QC "
      ,City:"East Main"
      ,Code:"ZEM"
    },
    {
       Country:" PA "
      ,City:"Easton"
      ,Code:"ABE"
    },
    {
       Country:" WI "
      ,City:"Eau Claire"
      ,Code:"EAU"
    },
    {
       Country:" Marshall Islands "
      ,City:"Ebon"
      ,Code:"EBO"
    },
    {
       Country:" United Kingdom "
      ,City:"Eday"
      ,Code:"EOI"
    },
    {
       Country:" United Kingdom "
      ,City:"Edinburgh"
      ,Code:"EDI"
    },
    {
       Country:" AB - International "
      ,City:"Edmonton"
      ,Code:"YEG"
    },
    {
       Country:" AB - Rail service "
      ,City:"Edmonton"
      ,Code:"XZL"
    },
    {
       Country:" AK "
      ,City:"Edna Bay"
      ,Code:"EDA"
    },
    {
       Country:" Turkey "
      ,City:"Edremit"
      ,Code:"EDO"
    },
    {
       Country:" Australia "
      ,City:"Edward River"
      ,Code:"EDR"
    },
    {
       Country:" AK "
      ,City:"Eek"
      ,Code:"EEK"
    },
    {
       Country:" Iceland "
      ,City:"Egilsstadir"
      ,Code:"EGS"
    },
    {
       Country:" Netherlands "
      ,City:"Eindhoven"
      ,Code:"EIN"
    },
    {
       Country:" Germany "
      ,City:"Eisenach"
      ,Code:"EIB"
    },
    {
       Country:" Russia "
      ,City:"Ekaterinburg"
      ,Code:"SVX"
    },
    {
       Country:" AK "
      ,City:"Ekuk"
      ,Code:"KKU"
    },
    {
       Country:" AK "
      ,City:"Ekwok"
      ,Code:"KEK"
    },
    {
       Country:" Argentina "
      ,City:"El Bolsan"
      ,Code:"EHL"
    },
    {
       Country:" CA "
      ,City:"El Centro"
      ,Code:"IPL"
    },
    {
       Country:" AR "
      ,City:"El Dorado"
      ,Code:"ELD"
    },
    {
       Country:" Sudan "
      ,City:"El Fasher"
      ,Code:"ELF"
    },
    {
       Country:" Argentina "
      ,City:"El Maiten"
      ,Code:"EMX"
    },
    {
       Country:" Sudan "
      ,City:"El Obeid"
      ,Code:"EBD"
    },
    {
       Country:" Algeria "
      ,City:"El Oved"
      ,Code:"ELU"
    },
    {
       Country:" TX "
      ,City:"El Paso"
      ,Code:"ELP"
    },
    {
       Country:" Dominician Republic - El Portillo"
      ,City:"El Portillo/Samana"
      ,Code:"EPS"
    },
    {
       Country:" Panama "
      ,City:"El Real"
      ,Code:"ELE"
    },
    {
       Country:" Chile "
      ,City:"El Salvador"
      ,Code:"ESR"
    },
    {
       Country:" Venezuela "
      ,City:"El Vigia"
      ,Code:"VIG"
    },
    {
       Country:" Colombia "
      ,City:"El Yopal"
      ,Code:"EYP"
    },
    {
       Country:" Italy "
      ,City:"Elat"
      ,Code:"ETH"
    },
    {
       Country:" Turkey "
      ,City:"Elazig"
      ,Code:"EZS"
    },
    {
       Country:" Italy "
      ,City:"Elba Island"
      ,Code:"EBA"
    },
    {
       Country:" Australia "
      ,City:"Elcho Island"
      ,Code:"ELC"
    },
    {
       Country:" Kenya "
      ,City:"Eldoret"
      ,Code:"EDL"
    },
    {
       Country:" Bahamas "
      ,City:"Eleuthera Island"
      ,Code:"ELH"
    },
    {
       Country:" AK "
      ,City:"Elfin Cove"
      ,Code:"ELV"
    },
    {
       Country:" AK "
      ,City:"Elim"
      ,Code:"ELI"
    },
    {
       Country:" Russia "
      ,City:"Elista"
      ,Code:"ESL"
    },
    {
       Country:" NV "
      ,City:"Elko"
      ,Code:"EKO"
    },
    {
       Country:" NY "
      ,City:"Elmira"
      ,Code:"ELM"
    },
    {
       Country:" MN "
      ,City:"Ely"
      ,Code:"LYU"
    },
    {
       Country:" Vanuata "
      ,City:"Emae"
      ,Code:"EAE"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Embessa"
      ,Code:"EMS"
    },
    {
       Country:" Australia "
      ,City:"Emerald"
      ,Code:"EMD"
    },
    {
       Country:" AK "
      ,City:"Emmonak"
      ,Code:"EMK"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Emo"
      ,Code:"EMO"
    },
    {
       Country:" Indonesia "
      ,City:"Enarotali"
      ,Code:"EWI"
    },
    {
       Country:" Indonesia "
      ,City:"Ende"
      ,Code:"ENE"
    },
    {
       Country:" NY "
      ,City:"Endicott"
      ,Code:"BGM"
    },
    {
       Country:" Marshall Islands "
      ,City:"Enewetak Island"
      ,Code:"ENT"
    },
    {
       Country:" OK "
      ,City:"Enid"
      ,Code:"WDG"
    },
    {
       Country:" Finland "
      ,City:"Enontekio"
      ,Code:"ENF"
    },
    {
       Country:" China "
      ,City:"Enshi"
      ,Code:"ENH"
    },
    {
       Country:" Uganda "
      ,City:"Entebbe"
      ,Code:"EBB"
    },
    {
       Country:" Nigeria "
      ,City:"Enugu"
      ,Code:"ENU"
    },
    {
       Country:" France "
      ,City:"Epinal"
      ,Code:"EPL"
    },
    {
       Country:" Cyprus "
      ,City:"Ercan"
      ,Code:"ECN"
    },
    {
       Country:" Germany "
      ,City:"Erfurt"
      ,Code:"ERF"
    },
    {
       Country:" PA "
      ,City:"Erie"
      ,Code:"ERI"
    },
    {
       Country:" Turkey "
      ,City:"Erzincan"
      ,Code:"ERC"
    },
    {
       Country:" Turkey "
      ,City:"Erzurum"
      ,Code:"ERZ"
    },
    {
       Country:" Denmark - Esbjerg Airport "
      ,City:"Esbjerg"
      ,Code:"EBJ"
    },
    {
       Country:" Denmark - Rail service "
      ,City:"Esbjerg"
      ,Code:"ZBB"
    },
    {
       Country:" MI "
      ,City:"Escanaba"
      ,Code:"ESC"
    },
    {
       Country:" Ecuador "
      ,City:"Esmeraldas"
      ,Code:"ESM"
    },
    {
       Country:" Australia "
      ,City:"Esperance"
      ,Code:"EPR"
    },
    {
       Country:" Vanuatu "
      ,City:"Espiritu Santo"
      ,Code:"SON"
    },
    {
       Country:" Argentina "
      ,City:"Esquel"
      ,Code:"EQS"
    },
    {
       Country:" BC "
      ,City:"Esquimalt"
      ,Code:"YPF"
    },
    {
       Country:" OR "
      ,City:"Eugene"
      ,Code:"EUG"
    },
    {
       Country:" NV "
      ,City:"Eureka"
      ,Code:"EUE"
    },
    {
       Country:" CA "
      ,City:"Eureka/Arcata"
      ,Code:"ACV"
    },
    {
       Country:" IN "
      ,City:"Evansville"
      ,Code:"EVV"
    },
    {
       Country:" United Kingdom "
      ,City:"Eveter"
      ,Code:"EXT"
    },
    {
       Country:" Indonesia "
      ,City:"Ewer"
      ,Code:"EWE"
    },
    {
       Country:" Australia "
      ,City:"Exmouth Gulf"
      ,Code:"EXM"
    },
    {
       Country:" Norway "
      ,City:"Fagernes"
      ,Code:"VDB"
    },
    {
       Country:" United Kingdom "
      ,City:"Fair Isle"
      ,Code:"FIE"
    },
    {
       Country:" AK "
      ,City:"Fairbanks"
      ,Code:"FAI"
    },
    {
       Country:" Pakistan "
      ,City:"Faisalabad"
      ,Code:"LYP"
    },
    {
       Country:" Puerto Rico "
      ,City:"Fajard"
      ,Code:"FAJ"
    },
    {
       Country:" Indonesia "
      ,City:"Fak Fak"
      ,Code:"FKQ"
    },
    {
       Country:" French Polynesia "
      ,City:"Fakarava"
      ,Code:"FAV"
    },
    {
       Country:" Madagascar "
      ,City:"Farafangana"
      ,Code:"RVA"
    },
    {
       Country:" ND "
      ,City:"Fargo"
      ,Code:"FAR"
    },
    {
       Country:" NM "
      ,City:"Farmington"
      ,Code:"FMN"
    },
    {
       Country:" Portugal "
      ,City:"Faro"
      ,Code:"FAO"
    },
    {
       Country:" Faroe Islands "
      ,City:"Faroe Islands"
      ,Code:"FAE"
    },
    {
       Country:" AR - Municipal/Drake "
      ,City:"Fayetteville"
      ,Code:"FYV"
    },
    {
       Country:" AR - Northwest Arkansas Regional "
      ,City:"Fayetteville"
      ,Code:"XNA"
    },
    {
       Country:" NC "
      ,City:"Fayetteville"
      ,Code:"FAY"
    },
    {
       Country:" Solomon Islands "
      ,City:"Fera Island"
      ,Code:"FRE"
    },
    {
       Country:" Uzbekistan "
      ,City:"Fergana"
      ,Code:"FEG"
    },
    {
       Country:" Brazil "
      ,City:"Fernando De Noronha"
      ,Code:"FEN"
    },
    {
       Country:" Morocco "
      ,City:"Fez"
      ,Code:"FEZ"
    },
    {
       Country:" Madagascar "
      ,City:"Fianarantsoa"
      ,Code:"WFI"
    },
    {
       Country:" France "
      ,City:"Figari"
      ,Code:"FSC"
    },
    {
       Country:" United Kingdom "
      ,City:"Filton"
      ,Code:"FZO"
    },
    {
       Country:" Germany "
      ,City:"Finkenwerder"
      ,Code:"XFW"
    },
    {
       Country:" Australia "
      ,City:"Fitzroy Crossing"
      ,Code:"FIZ"
    },
    {
       Country:" AZ "
      ,City:"Flagstaff"
      ,Code:"FLG"
    },
    {
       Country:" Germany "
      ,City:"Flensburg"
      ,Code:"FLF"
    },
    {
       Country:" MB "
      ,City:"Flin Flon"
      ,Code:"YFO"
    },
    {
       Country:" MI "
      ,City:"Flint"
      ,Code:"FNT"
    },
    {
       Country:" Italy - Gal Galilei "
      ,City:"Florence"
      ,Code:"PSA"
    },
    {
       Country:" Italy - Peretola "
      ,City:"Florence"
      ,Code:"FLR"
    },
    {
       Country:" SC "
      ,City:"Florence"
      ,Code:"FLO"
    },
    {
       Country:" AL "
      ,City:"Florence/Muscle Shoals/Sheffield"
      ,Code:"MSL"
    },
    {
       Country:" Colombia "
      ,City:"Florencia"
      ,Code:"FLA"
    },
    {
       Country:" Portugal "
      ,City:"Flores Island"
      ,Code:"FLW"
    },
    {
       Country:" Guatemala "
      ,City:"Flores"
      ,Code:"FRS"
    },
    {
       Country:" Brazil "
      ,City:"Florianopolis"
      ,Code:"FLN"
    },
    {
       Country:" Norway "
      ,City:"Floro"
      ,Code:"FRO"
    },
    {
       Country:" Italy "
      ,City:"Foggia"
      ,Code:"FOG"
    },
    {
       Country:" SK "
      ,City:"Fond du Lac"
      ,Code:"ZFD"
    },
    {
       Country:" Norway "
      ,City:"Forde"
      ,Code:"FDE"
    },
    {
       Country:" Argentina "
      ,City:"Formosa"
      ,Code:"FMA"
    },
    {
       Country:" ON "
      ,City:"Fort Albany"
      ,Code:"YFA"
    },
    {
       Country:" AB "
      ,City:"Fort Chipewyan"
      ,Code:"YPY"
    },
    {
       Country:" CO - Bus service "
      ,City:"Fort Collins/Loveland"
      ,Code:"QWF"
    },
    {
       Country:" CO - Municipal Airport "
      ,City:"Fort Collins/Loveland"
      ,Code:"FNL"
    },
    {
       Country:" Madagascar "
      ,City:"Fort Dauphin"
      ,Code:"FTU"
    },
    {
       Country:" Martinique "
      ,City:"Fort De France"
      ,Code:"FDF"
    },
    {
       Country:" IA "
      ,City:"Fort Dodge"
      ,Code:"FOD"
    },
    {
       Country:" ON "
      ,City:"Fort Frances"
      ,Code:"YAG"
    },
    {
       Country:" NT "
      ,City:"Fort Good Hope"
      ,Code:"YGH"
    },
    {
       Country:" ON "
      ,City:"Fort Hope"
      ,Code:"YFH"
    },
    {
       Country:" FL "
      ,City:"Fort Lauderdale"
      ,Code:"FLL"
    },
    {
       Country:" MO "
      ,City:"Fort Leonard Wood"
      ,Code:"TBN"
    },
    {
       Country:" AB "
      ,City:"Fort Mcmurray"
      ,Code:"YMM"
    },
    {
       Country:" FL "
      ,City:"Fort Myers"
      ,Code:"RSW"
    },
    {
       Country:" BC "
      ,City:"Fort Nelson"
      ,Code:"YYE"
    },
    {
       Country:" ON "
      ,City:"Fort Severn"
      ,Code:"YER"
    },
    {
       Country:" NT "
      ,City:"Fort Simpson"
      ,Code:"YFS"
    },
    {
       Country:" AR "
      ,City:"Fort Smith"
      ,Code:"FSM"
    },
    {
       Country:" NT "
      ,City:"Fort Smith"
      ,Code:"YSM"
    },
    {
       Country:" BC "
      ,City:"Fort St John"
      ,Code:"YXJ"
    },
    {
       Country:" FL "
      ,City:"Fort Walton Beach"
      ,Code:"VPS"
    },
    {
       Country:" IN "
      ,City:"Fort Wayne"
      ,Code:"FWA"
    },
    {
       Country:" TX "
      ,City:"Fort Worth/Dallas"
      ,Code:"DFW"
    },
    {
       Country:" Brazil "
      ,City:"Fortaleza"
      ,Code:"FOR"
    },
    {
       Country:" NL "
      ,City:"Fox Harbour/St Lewis"
      ,Code:"YFX"
    },
    {
       Country:" Brazil "
      ,City:"Franca"
      ,Code:"FRC"
    },
    {
       Country:" Gabon "
      ,City:"Franceville"
      ,Code:"MVB"
    },
    {
       Country:" Botswana "
      ,City:"Francistown"
      ,Code:"FRW"
    },
    {
       Country:" Germany - Hahn "
      ,City:"Frankfurt"
      ,Code:"HHN"
    },
    {
       Country:" Germany - International "
      ,City:"Frankfurt"
      ,Code:"FRA"
    },
    {
       Country:" PA "
      ,City:"Franklin"
      ,Code:"FKL"
    },
    {
       Country:" Denmark "
      ,City:"Fredericia"
      ,Code:"ZBJ"
    },
    {
       Country:" NB - Rail service "
      ,City:"Fredericton Junction"
      ,Code:"XFC"
    },
    {
       Country:" NB "
      ,City:"Fredericton"
      ,Code:"YFC"
    },
    {
       Country:" Bahamas "
      ,City:"Freeport"
      ,Code:"FPO"
    },
    {
       Country:" Sierra Leone - Lungi Intl "
      ,City:"Freetown"
      ,Code:"FNA"
    },
    {
       Country:" CA "
      ,City:"Fresno"
      ,Code:"FAT"
    },
    {
       Country:" Germany "
      ,City:"Friedrichshafer"
      ,Code:"FDH"
    },
    {
       Country:" Spain "
      ,City:"Fuerteventura"
      ,Code:"FUE"
    },
    {
       Country:" Japan "
      ,City:"Fukue"
      ,Code:"FUJ"
    },
    {
       Country:" Japan "
      ,City:"Fukuoka"
      ,Code:"FUK"
    },
    {
       Country:" Japan "
      ,City:"Fukushima"
      ,Code:"FKS"
    },
    {
       Country:" Tuvalu "
      ,City:"Funafuti Atol"
      ,Code:"FUN"
    },
    {
       Country:" Portugal "
      ,City:"Funchal"
      ,Code:"FNC"
    },
    {
       Country:" Vanuatu "
      ,City:"Futuna Island"
      ,Code:"FTA"
    },
    {
       Country:" Wallis and Futuna Islands "
      ,City:"Futuna Island"
      ,Code:"FUT"
    },
    {
       Country:" China "
      ,City:"Fuyang"
      ,Code:"FUG"
    },
    {
       Country:" China "
      ,City:"Fuzhou"
      ,Code:"FOC"
    },
    {
       Country:" Botswana "
      ,City:"Gaborone"
      ,Code:"GBE"
    },
    {
       Country:" Tunisia "
      ,City:"Gafsa"
      ,Code:"GAF"
    },
    {
       Country:" Cote D'Ivoire "
      ,City:"Gagnoa"
      ,Code:"GGN"
    },
    {
       Country:" FL "
      ,City:"Gainesville"
      ,Code:"GNV"
    },
    {
       Country:" Ecuador "
      ,City:"Galapagos"
      ,Code:"GPS"
    },
    {
       Country:" Sweden "
      ,City:"Gallivare"
      ,Code:"GEV"
    },
    {
       Country:" NM "
      ,City:"Gallup"
      ,Code:"GUP"
    },
    {
       Country:" Ireland "
      ,City:"Galway"
      ,Code:"GWY"
    },
    {
       Country:" Gabon "
      ,City:"Gamba"
      ,Code:"GAX"
    },
    {
       Country:" Ethiopia "
      ,City:"Gambela"
      ,Code:"GMB"
    },
    {
       Country:" Maldives "
      ,City:"Gan Island"
      ,Code:"GAN"
    },
    {
       Country:" NL "
      ,City:"Gander"
      ,Code:"YQX"
    },
    {
       Country:" South Korea "
      ,City:"Gangneung"
      ,Code:"KAG"
    },
    {
       Country:" Panama "
      ,City:"Garachine"
      ,Code:"GHE"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Garaina"
      ,Code:"GAR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Garasa"
      ,Code:"GRL"
    },
    {
       Country:" KS "
      ,City:"Garden City"
      ,Code:"GCK"
    },
    {
       Country:" Australia "
      ,City:"Garden Point"
      ,Code:"GPN"
    },
    {
       Country:" Cameroon "
      ,City:"Garoua"
      ,Code:"GOV"
    },
    {
       Country:" IN "
      ,City:"Gary"
      ,Code:"GYY"
    },
    {
       Country:" QC "
      ,City:"Gaspe"
      ,Code:"YGP"
    },
    {
       Country:" QC - Rail service "
      ,City:"Gaspe"
      ,Code:"XDD"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Gassim"
      ,Code:"ELQ"
    },
    {
       Country:" Vanuatu "
      ,City:"Gaua"
      ,Code:"ZGU"
    },
    {
       Country:" India "
      ,City:"Gawahati"
      ,Code:"GAU"
    },
    {
       Country:" Occupied Palestinian Territory "
      ,City:"Gaza City"
      ,Code:"GZA"
    },
    {
       Country:" Turkey "
      ,City:"Gaziatep"
      ,Code:"GZT"
    },
    {
       Country:" Poland "
      ,City:"Gdansk"
      ,Code:"GDN"
    },
    {
       Country:" Indonesia "
      ,City:"Gebe"
      ,Code:"GEB"
    },
    {
       Country:" Russia "
      ,City:"Gelendzik"
      ,Code:"GDZ"
    },
    {
       Country:" Sudan "
      ,City:"Geneina"
      ,Code:"EGN"
    },
    {
       Country:" Philippines "
      ,City:"General Santos"
      ,Code:"GES"
    },
    {
       Country:" Switzerland "
      ,City:"Geneva"
      ,Code:"GVA"
    },
    {
       Country:" Italy "
      ,City:"Genoa"
      ,Code:"GOA"
    },
    {
       Country:" Bahamas "
      ,City:"George Town"
      ,Code:"GGT"
    },
    {
       Country:" South Africa "
      ,City:"George"
      ,Code:"GRJ"
    },
    {
       Country:" Guyana "
      ,City:"Georgetown"
      ,Code:"GEO"
    },
    {
       Country:" ON - Rail service "
      ,City:"Georgetown"
      ,Code:"XHM"
    },
    {
       Country:" Australia"
      ,City:"Geraldton"
      ,Code:"GET"
    },
    {
       Country:" Spain "
      ,City:"Gerona"
      ,Code:"GRO"
    },
    {
       Country:" QC "
      ,City:"Gethsemani"
      ,Code:"ZGS"
    },
    {
       Country:" Libya "
      ,City:"Ghadames"
      ,Code:"LTD"
    },
    {
       Country:" Algeria "
      ,City:"Ghardala"
      ,Code:"GHA"
    },
    {
       Country:" Libya "
      ,City:"Ghat"
      ,Code:"GHT"
    },
    {
       Country:" Gibraltar "
      ,City:"Gibraltar"
      ,Code:"GIB"
    },
    {
       Country:" Pakistan "
      ,City:"Gilgit"
      ,Code:"GIL"
    },
    {
       Country:" MB "
      ,City:"Gillam"
      ,Code:"YGX"
    },
    {
       Country:" WY "
      ,City:"Gillette"
      ,Code:"GCC"
    },
    {
       Country:" BC "
      ,City:"Gillies Bay"
      ,Code:"YGB"
    },
    {
       Country:" New Zealand "
      ,City:"Gisborne"
      ,Code:"GIS"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Gizan"
      ,Code:"GIZ"
    },
    {
       Country:" Solomon Islands "
      ,City:"Gizo"
      ,Code:"GZO"
    },
    {
       Country:" NU "
      ,City:"Gjoa Haven"
      ,Code:"YHK"
    },
    {
       Country:" TX "
      ,City:"Gladewater/Kilgore"
      ,Code:"GGG"
    },
    {
       Country:" Australia "
      ,City:"Gladstone"
      ,Code:"GLT"
    },
    {
       Country:" MT "
      ,City:"Glasgow"
      ,Code:"GGW"
    },
    {
       Country:" United Kingdom - Glasgow International "
      ,City:"Glasgow"
      ,Code:"GLA"
    },
    {
       Country:" United Kingdom - Prestwick "
      ,City:"Glasgow"
      ,Code:"PIK"
    },
    {
       Country:" Australia "
      ,City:"Glen Innes"
      ,Code:"GLI"
    },
    {
       Country:" ON - Rail service "
      ,City:"Glencoe"
      ,Code:"XZC"
    },
    {
       Country:" MT "
      ,City:"Glendive"
      ,Code:"GDV"
    },
    {
       Country:" India "
      ,City:"Goa"
      ,Code:"GOI"
    },
    {
       Country:" Ethiopia "
      ,City:"Goba"
      ,Code:"GOB"
    },
    {
       Country:" Argentina "
      ,City:"Gobernador Gregores"
      ,Code:"GGS"
    },
    {
       Country:" Ethopia "
      ,City:"Gode/Iddidole"
      ,Code:"GDE"
    },
    {
       Country:" MB "
      ,City:"Gods Narrows"
      ,Code:"YGO"
    },
    {
       Country:" MB "
      ,City:"Gods River"
      ,Code:"ZGI"
    },
    {
       Country:" Brazil "
      ,City:"Goiania"
      ,Code:"GYN"
    },
    {
       Country:" Australia"
      ,City:"Gold Coast"
      ,Code:"OOL"
    },
    {
       Country:" Costa Rica "
      ,City:"Golfito"
      ,Code:"GLF"
    },
    {
       Country:" China "
      ,City:"Golmud"
      ,Code:"GOQ"
    },
    {
       Country:" AK "
      ,City:"Golovin"
      ,Code:"GLV"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Gonalia"
      ,Code:"GOE"
    },
    {
       Country:" Ethiopia "
      ,City:"Gondari"
      ,Code:"GDQ"
    },
    {
       Country:" AK "
      ,City:"Goodnews Bay"
      ,Code:"GNU"
    },
    {
       Country:" NL "
      ,City:"Goose Bay"
      ,Code:"YYR"
    },
    {
       Country:" Ethiopia "
      ,City:"Gore"
      ,Code:"GOR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Goroka"
      ,Code:"GKA"
    },
    {
       Country:" Indonesia "
      ,City:"Gorontalo"
      ,Code:"GTO"
    },
    {
       Country:" Sweden - Landvetter "
      ,City:"Gothenburg"
      ,Code:"GOT"
    },
    {
       Country:" Sweden - Saeve "
      ,City:"Gothenburg"
      ,Code:"GSE"
    },
    {
       Country:" Australia "
      ,City:"Goulburn Island"
      ,Code:"GBL"
    },
    {
       Country:" Mali "
      ,City:"Goundam"
      ,Code:"GUD"
    },
    {
       Country:" Australia "
      ,City:"Gove"
      ,Code:"GOV"
    },
    {
       Country:" Brazil "
      ,City:"Governador Valadares"
      ,Code:"GVR"
    },
    {
       Country:" Bahamas "
      ,City:"Governors Harbour"
      ,Code:"GHB"
    },
    {
       Country:" Argentina "
      ,City:"Goya"
      ,Code:"OYA"
    },
    {
       Country:" Malta "
      ,City:"Gozo"
      ,Code:"GZM"
    },
    {
       Country:" Portugal "
      ,City:"Graciosa Island"
      ,Code:"GRW"
    },
    {
       Country:" Australia "
      ,City:"Grafton"
      ,Code:"GFN"
    },
    {
       Country:" Spain "
      ,City:"Granada"
      ,Code:"GRX"
    },
    {
       Country:" AZ - Heliport "
      ,City:"Grand Canyon"
      ,Code:"JGC"
    },
    {
       Country:" AZ - National Park "
      ,City:"Grand Canyon"
      ,Code:"GCN"
    },
    {
       Country:" Cayman Islands "
      ,City:"Grand Cayman"
      ,Code:"GCM"
    },
    {
       Country:" ND "
      ,City:"Grand Forks"
      ,Code:"GFK"
    },
    {
       Country:" NE "
      ,City:"Grand Island"
      ,Code:"GRI"
    },
    {
       Country:" CO "
      ,City:"Grand Junction"
      ,Code:"GJT"
    },
    {
       Country:" MI "
      ,City:"Grand Rapids"
      ,Code:"GRR"
    },
    {
       Country:" MN "
      ,City:"Grand Rapids"
      ,Code:"GPZ"
    },
    {
       Country:" Turks and Caicos Islands "
      ,City:"Grand Turk Island"
      ,Code:"GDT"
    },
    {
       Country:" AB "
      ,City:"Grande Prairie"
      ,Code:"YQU"
    },
    {
       Country:" AK "
      ,City:"Grayling"
      ,Code:"KGX"
    },
    {
       Country:" Austria "
      ,City:"Graz"
      ,Code:"GRZ"
    },
    {
       Country:" MT "
      ,City:"Great Falls"
      ,Code:"GTF"
    },
    {
       Country:" WI "
      ,City:"Green Bay"
      ,Code:"GRB"
    },
    {
       Country:" NC "
      ,City:"Greensboro"
      ,Code:"GSO"
    },
    {
       Country:" MS "
      ,City:"Greenville"
      ,Code:"GLH"
    },
    {
       Country:" NC "
      ,City:"Greenville"
      ,Code:"PGV"
    },
    {
       Country:" SC "
      ,City:"Greenville/Spartanburg"
      ,Code:"GSP"
    },
    {
       Country:" Grenada"
      ,City:"Grenada"
      ,Code:"GND"
    },
    {
       Country:" France "
      ,City:"Grenoble"
      ,Code:"GNB"
    },
    {
       Country:" Australia "
      ,City:"Griffith"
      ,Code:"GFF"
    },
    {
       Country:" ON "
      ,City:"Grimsby"
      ,Code:"XGY"
    },
    {
       Country:" Iceland "
      ,City:"Grimsey"
      ,Code:"GRY"
    },
    {
       Country:" NU "
      ,City:"Grise Fiord"
      ,Code:"YGZ"
    },
    {
       Country:" Greenland "
      ,City:"Groennedal"
      ,Code:"JGR"
    },
    {
       Country:" Netherlands "
      ,City:"Groningen"
      ,Code:"GRQ"
    },
    {
       Country:" Australia "
      ,City:"Groofe Eylandt"
      ,Code:"GTE"
    },
    {
       Country:" CT "
      ,City:"Groton/New London"
      ,Code:"GON"
    },
    {
       Country:" Mexico "
      ,City:"Guadalajara"
      ,Code:"GDL"
    },
    {
       Country:""
      ,City:"Guam "
      ,Code:"GUM"
    },
    {
       Country:" Honduras "
      ,City:"Guanaja"
      ,Code:"GJA"
    },
    {
       Country:" Mexico "
      ,City:"Guanajuato"
      ,Code:"BJX"
    },
    {
       Country:" China "
      ,City:"Guangzhou"
      ,Code:"CAN"
    },
    {
       Country:" Cuba "
      ,City:"Guantanamo"
      ,Code:"GAO"
    },
    {
       Country:" Guatemala "
      ,City:"Guatemala City"
      ,Code:"GUA"
    },
    {
       Country:" Ecuador "
      ,City:"Guayaquil"
      ,Code:"GYE"
    },
    {
       Country:" Bolivia "
      ,City:"Guayaramerin"
      ,Code:"GYA"
    },
    {
       Country:" Mexico "
      ,City:"Guaymas"
      ,Code:"GYM"
    },
    {
       Country:" ON - Rail service "
      ,City:"Guelph"
      ,Code:"XIA"
    },
    {
       Country:" United Kingdom "
      ,City:"Guernsey"
      ,Code:"GCI"
    },
    {
       Country:" Mexico "
      ,City:"Guerrero Negro"
      ,Code:"GUB"
    },
    {
       Country:" China "
      ,City:"Guilin"
      ,Code:"KWL"
    },
    {
       Country:" Venezuela "
      ,City:"Guiria"
      ,Code:"GUI"
    },
    {
       Country:" MS "
      ,City:"Gulfport"
      ,Code:"GPT"
    },
    {
       Country:" Uganda "
      ,City:"Gulu"
      ,Code:"ULU"
    },
    {
       Country:" China "
      ,City:"Gulyang"
      ,Code:"KWE"
    },
    {
       Country:" CO "
      ,City:"Gunnison"
      ,Code:"GUC"
    },
    {
       Country:" South Korea "
      ,City:"Gunsan"
      ,Code:"KUV"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Gurayat"
      ,Code:"URY"
    },
    {
       Country:" AK "
      ,City:"Gustavus"
      ,Code:"GST"
    },
    {
       Country:" Pakistan "
      ,City:"Gwadar"
      ,Code:"GWD"
    },
    {
       Country:" India "
      ,City:"Gwalior"
      ,Code:"GWL"
    },
    {
       Country:" South Korea "
      ,City:"Gwangju"
      ,Code:"KWJ"
    },
    {
       Country:" Azerbaijan "
      ,City:"Gyandzha"
      ,Code:"KVD"
    },
    {
       Country:" Armenia "
      ,City:"Gyourmri"
      ,Code:"LWN"
    },
    {
       Country:" Tonga "
      ,City:"HaApa"
      ,Code:"HPA"
    },
    {
       Country:" Japan "
      ,City:"Hachijo Jima"
      ,Code:"HAC"
    },
    {
       Country:" MD "
      ,City:"Hagerstown"
      ,Code:"HGR"
    },
    {
       Country:" Sweden "
      ,City:"Hagfors"
      ,Code:"HFS"
    },
    {
       Country:" Israel "
      ,City:"Haifa"
      ,Code:"HFA"
    },
    {
       Country:" China "
      ,City:"Haikou"
      ,Code:"HAK"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Hail"
      ,Code:"HAS"
    },
    {
       Country:" China "
      ,City:"Hailar"
      ,Code:"HLD"
    },
    {
       Country:" ID "
      ,City:"Hailey"
      ,Code:"SUN"
    },
    {
       Country:" AK "
      ,City:"Haines"
      ,Code:"HNS"
    },
    {
       Country:" Viet Nam - Catbi "
      ,City:"Haiphong"
      ,Code:"HPH"
    },
    {
       Country:" Japan "
      ,City:"Hakodate"
      ,Code:"HKD"
    },
    {
       Country:" Germany "
      ,City:"Halberstadt"
      ,Code:"ZHQ"
    },
    {
       Country:" NS - International "
      ,City:"Halifax"
      ,Code:"YHZ"
    },
    {
       Country:" NS - Rail service "
      ,City:"Halifax"
      ,Code:"XDG"
    },
    {
       Country:" NU "
      ,City:"Hall Beach"
      ,Code:"YUX"
    },
    {
       Country:" Australia "
      ,City:"Halls Creek"
      ,Code:"HCQ"
    },
    {
       Country:" Sweden "
      ,City:"Halmstad"
      ,Code:"HAD"
    },
    {
       Country:" Germany - Fuhisbuettel "
      ,City:"Hamburg"
      ,Code:"HAM"
    },
    {
       Country:" Germany - Luebeck "
      ,City:"Hamburg"
      ,Code:"LBC"
    },
    {
       Country:" Australia "
      ,City:"Hamilton Island"
      ,Code:"HTI"
    },
    {
       Country:" Bermuda "
      ,City:"Hamilton"
      ,Code:"BDA"
    },
    {
       Country:" New Zealand "
      ,City:"Hamilton"
      ,Code:"HLZ"
    },
    {
       Country:" ON "
      ,City:"Hamilton"
      ,Code:"YHM"
    },
    {
       Country:" Norway "
      ,City:"Hammerfest"
      ,Code:"HFT"
    },
    {
       Country:" VA "
      ,City:"Hampton"
      ,Code:"PHF"
    },
    {
       Country:" HI - Island of Maui "
      ,City:"Hana"
      ,Code:"HNM"
    },
    {
       Country:" HI "
      ,City:"Hanapepe"
      ,Code:"PAK"
    },
    {
       Country:" MI "
      ,City:"Hancock"
      ,Code:"CMX"
    },
    {
       Country:" China "
      ,City:"Hangzhou"
      ,Code:"HGH"
    },
    {
       Country:" Maldives "
      ,City:"Hanimaadhoo"
      ,Code:"HAQ"
    },
    {
       Country:" Viet Nam - Noibai "
      ,City:"Hanoi"
      ,Code:"HAN"
    },
    {
       Country:" Germany "
      ,City:"Hanover"
      ,Code:"HAJ"
    },
    {
       Country:" NH "
      ,City:"Hanover"
      ,Code:"LEB"
    },
    {
       Country:" China "
      ,City:"Hanzhang"
      ,Code:"HZG"
    },
    {
       Country:" Zimbabwe "
      ,City:"Harare"
      ,Code:"HRE"
    },
    {
       Country:" China "
      ,City:"Harbin"
      ,Code:"HRB"
    },
    {
       Country:" Somolia "
      ,City:"Hargeisa"
      ,Code:"HGA"
    },
    {
       Country:" TX "
      ,City:"Harlingen"
      ,Code:"HRL"
    },
    {
       Country:" PA "
      ,City:"Harrisburg"
      ,Code:"MDT"
    },
    {
       Country:" AR "
      ,City:"Harrison"
      ,Code:"HRO"
    },
    {
       Country:" Norway "
      ,City:"Harstad-Narvik"
      ,Code:"EVE"
    },
    {
       Country:" CT "
      ,City:"Hartford"
      ,Code:"BDL"
    },
    {
       Country:" Algeria "
      ,City:"Hassi Messaoud"
      ,Code:"HME"
    },
    {
       Country:" Norway "
      ,City:"Hasvik"
      ,Code:"HAA"
    },
    {
       Country:" Thailand "
      ,City:"Hat Yai"
      ,Code:"HDY"
    },
    {
       Country:" Japan "
      ,City:"Hateruma"
      ,Code:"HTR"
    },
    {
       Country:" Norway "
      ,City:"Haugesund"
      ,Code:"HAU"
    },
    {
       Country:" Cuba "
      ,City:"Havana"
      ,Code:"HAV"
    },
    {
       Country:" AZ "
      ,City:"Havasupai"
      ,Code:"HAE"
    },
    {
       Country:" QC "
      ,City:"Havre St Pierre"
      ,Code:"YGV"
    },
    {
       Country:" MT "
      ,City:"Havre"
      ,Code:"HVR"
    },
    {
       Country:" NT "
      ,City:"Hay River"
      ,Code:"YHY"
    },
    {
       Country:" CO "
      ,City:"Hayden"
      ,Code:"HDN"
    },
    {
       Country:" Australia "
      ,City:"Hayman Island"
      ,Code:"HIS"
    },
    {
       Country:" KS "
      ,City:"Hays"
      ,Code:"HYS"
    },
    {
       Country:" AK "
      ,City:"Healy Lake"
      ,Code:"HKB"
    },
    {
       Country:" China "
      ,City:"Hefei"
      ,Code:"HFE"
    },
    {
       Country:" Germany "
      ,City:"Heidelberg"
      ,Code:"HDB"
    },
    {
       Country:" MT "
      ,City:"Helena"
      ,Code:"HLN"
    },
    {
       Country:" Germany "
      ,City:"Helgoland"
      ,Code:"HGL"
    },
    {
       Country:" Finland "
      ,City:"Helsinki"
      ,Code:"HEL"
    },
    {
       Country:" NC "
      ,City:"Hendersonville"
      ,Code:"AVL"
    },
    {
       Country:" Myanmar "
      ,City:"Heno"
      ,Code:"HEH"
    },
    {
       Country:" Greece "
      ,City:"Heraklian"
      ,Code:"HER"
    },
    {
       Country:" Germany "
      ,City:"Heringsdorf"
      ,Code:"HDF"
    },
    {
       Country:" Sweden "
      ,City:"Hermavan"
      ,Code:"HMV"
    },
    {
       Country:" Mexico "
      ,City:"Hermosillo"
      ,Code:"HMO"
    },
    {
       Country:" Denmark "
      ,City:"Herning"
      ,Code:"XAK"
    },
    {
       Country:" Australia "
      ,City:"Hervey Bay"
      ,Code:"HVB"
    },
    {
       Country:" QC - Rail service "
      ,City:"Hervey"
      ,Code:"XDU"
    },
    {
       Country:" MN "
      ,City:"Hibbing/Chisholm"
      ,Code:"HIB"
    },
    {
       Country:" NC "
      ,City:"Hickory"
      ,Code:"HKY"
    },
    {
       Country:" AB "
      ,City:"High Level"
      ,Code:"YOJ"
    },
    {
       Country:" NC "
      ,City:"High Point"
      ,Code:"GSO"
    },
    {
       Country:" HI - Island of Hawaii "
      ,City:"Hilo"
      ,Code:"ITO"
    },
    {
       Country:" SC "
      ,City:"Hilton Head"
      ,Code:"HHH"
    },
    {
       Country:" Japan - Hiroshima West "
      ,City:"Hiroshima"
      ,Code:"HIW"
    },
    {
       Country:" Japan - International "
      ,City:"Hiroshima"
      ,Code:"HIJ"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Hivaro"
      ,Code:"HIT"
    },
    {
       Country:" Viet Nam "
      ,City:"Ho Chi Minh City"
      ,Code:"SGN"
    },
    {
       Country:" Australia "
      ,City:"Hobart"
      ,Code:"HBA"
    },
    {
       Country:" NM "
      ,City:"Hobbs"
      ,Code:"HBB"
    },
    {
       Country:" Yemen "
      ,City:"Hodeidah"
      ,Code:"HOD"
    },
    {
       Country:" South Africa "
      ,City:"Hoedspruit"
      ,Code:"HDS"
    },
    {
       Country:" Germany "
      ,City:"Hof"
      ,Code:"HOQ"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Hofuf"
      ,Code:"HOF"
    },
    {
       Country:" China "
      ,City:"Hohhot"
      ,Code:"HET"
    },
    {
       Country:" New Zealand "
      ,City:"Hokitika"
      ,Code:"HKK"
    },
    {
       Country:" Cuba "
      ,City:"Holguin"
      ,Code:"HOG"
    },
    {
       Country:" AK "
      ,City:"Hollis"
      ,Code:"HYL"
    },
    {
       Country:" NT "
      ,City:"Holman"
      ,Code:"YHI"
    },
    {
       Country:" AK "
      ,City:"Holy Cross"
      ,Code:"HCR"
    },
    {
       Country:" AK "
      ,City:"Homer"
      ,Code:"HOM"
    },
    {
       Country:" Hong Kong "
      ,City:"Hong Kong"
      ,Code:"HKG"
    },
    {
       Country:" Solomon Islands "
      ,City:"Honiara"
      ,Code:"HIR"
    },
    {
       Country:" Norway "
      ,City:"Honningsvag"
      ,Code:"HVG"
    },
    {
       Country:" HI - Island of Oahu "
      ,City:"Honolulu"
      ,Code:"HNL"
    },
    {
       Country:" Australia "
      ,City:"Hooker"
      ,Code:"HOK"
    },
    {
       Country:" HI - Island of Molokai "
      ,City:"Hoolehua"
      ,Code:"MKK"
    },
    {
       Country:" AK "
      ,City:"Hoonah"
      ,Code:"HNH"
    },
    {
       Country:" AK "
      ,City:"Hooper Bay"
      ,Code:"HPB"
    },
    {
       Country:" NL "
      ,City:"Hopedale"
      ,Code:"YHO"
    },
    {
       Country:""
      ,City:"Horn Island Australia "
      ,Code:"HID"
    },
    {
       Country:" Iceland "
      ,City:"Hornafjordur"
      ,Code:"HFN"
    },
    {
       Country:" Portugal "
      ,City:"Horta"
      ,Code:"HOR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Hoskins"
      ,Code:"HKN"
    },
    {
       Country:" AR "
      ,City:"Hot Springs"
      ,Code:"HOT"
    },
    {
       Country:" China "
      ,City:"Hotan"
      ,Code:"HTN"
    },
    {
       Country:" Laos "
      ,City:"Houeisay"
      ,Code:"HOE"
    },
    {
       Country:" Libya "
      ,City:"Houn"
      ,Code:"HUQ"
    },
    {
       Country:" BC - Bus station "
      ,City:"Houston"
      ,Code:"ZHO"
    },
    {
       Country:" TX - All airports "
      ,City:"Houston"
      ,Code:"HOU"
    },
    {
       Country:" TX - Hobby "
      ,City:"Houston"
      ,Code:"HOU"
    },
    {
       Country:" TX - Intercontinental "
      ,City:"Houston"
      ,Code:"IAH"
    },
    {
       Country:" French Polynesia "
      ,City:"Huahine"
      ,Code:"HUH"
    },
    {
       Country:" Taiwan - Phi Bai "
      ,City:"Hualien"
      ,Code:"HUN"
    },
    {
       Country:" Thailand "
      ,City:"Hualtin"
      ,Code:"HHQ"
    },
    {
       Country:" French Polynesia "
      ,City:"Huanuco"
      ,Code:"HUU"
    },
    {
       Country:" China "
      ,City:"Huargyan"
      ,Code:"HYN"
    },
    {
       Country:" Mexico "
      ,City:"Huatulco"
      ,Code:"HUX"
    },
    {
       Country:" Sweden "
      ,City:"Hudiksvall"
      ,Code:"HUV"
    },
    {
       Country:" SK "
      ,City:"Hudson Bay"
      ,Code:"YHB"
    },
    {
       Country:" Viet Nam "
      ,City:"Hue"
      ,Code:"HUI"
    },
    {
       Country:" Australia "
      ,City:"Hughenden"
      ,Code:"HGD"
    },
    {
       Country:" AK "
      ,City:"Hughes"
      ,Code:"HUS"
    },
    {
       Country:" Sweden "
      ,City:"Hultsfred"
      ,Code:"HLF"
    },
    {
       Country:" United Kingdom "
      ,City:"Humberside"
      ,Code:"HUY"
    },
    {
       Country:" WV/Ashland"
      ,City:"Huntington"
      ,Code:"HTS"
    },
    {
       Country:" AL "
      ,City:"Huntsville"
      ,Code:"HSV"
    },
    {
       Country:" Egypt "
      ,City:"Hurghada"
      ,Code:"HRG"
    },
    {
       Country:" SD "
      ,City:"Huron"
      ,Code:"HON"
    },
    {
       Country:" AK "
      ,City:"Huslia"
      ,Code:"HSL"
    },
    {
       Country:" Zimbabwe "
      ,City:"Hwange Nat Park"
      ,Code:"HWN"
    },
    {
       Country:" MA "
      ,City:"Hyannis"
      ,Code:"HYA"
    },
    {
       Country:" AK "
      ,City:"Hydaburg"
      ,Code:"HYG"
    },
    {
       Country:" India "
      ,City:"Hyderabad"
      ,Code:"HYD"
    },
    {
       Country:" Romania "
      ,City:"Iasi"
      ,Code:"IAS"
    },
    {
       Country:" Colombia "
      ,City:"Ibague"
      ,Code:"IBE"
    },
    {
       Country:" Spain "
      ,City:"Ibiza"
      ,Code:"IBZ"
    },
    {
       Country:" ID "
      ,City:"Idaho Falls"
      ,Code:"IDA"
    },
    {
       Country:" Russia "
      ,City:"Igarka"
      ,Code:"IAA"
    },
    {
       Country:" AK "
      ,City:"Igiugig"
      ,Code:"IGG"
    },
    {
       Country:" NU "
      ,City:"Igloolik"
      ,Code:"YGT"
    },
    {
       Country:" Brazil "
      ,City:"Iguassu Falls"
      ,Code:"IGU"
    },
    {
       Country:" Argentina "
      ,City:"Iguazu"
      ,Code:"IGR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Ihu"
      ,Code:"IHU"
    },
    {
       Country:" New Caledonia "
      ,City:"Ile Des Pins"
      ,Code:"ILP"
    },
    {
       Country:" QC "
      ,City:"Iles De La Madeleine"
      ,Code:"YGR"
    },
    {
       Country:" MB "
      ,City:"Ilford"
      ,Code:"ILF"
    },
    {
       Country:" Brazil "
      ,City:"Ilheus"
      ,Code:"IOS"
    },
    {
       Country:" AK "
      ,City:"Iliamna"
      ,Code:"ILI"
    },
    {
       Country:" Indonesia "
      ,City:"Illaga"
      ,Code:"ILA"
    },
    {
       Country:" Philippines - Mandurriao "
      ,City:"Iloilo"
      ,Code:"ILO"
    },
    {
       Country:" Indonesia "
      ,City:"Ilu"
      ,Code:"IUL"
    },
    {
       Country:" Greenland "
      ,City:"Ilulissat"
      ,Code:"JAV"
    },
    {
       Country:" Brazil "
      ,City:"Imperatriz"
      ,Code:"IMP"
    },
    {
       Country:" CA "
      ,City:"Imperial"
      ,Code:"IPL"
    },
    {
       Country:" India "
      ,City:"Imphal"
      ,Code:"IMF"
    },
    {
       Country:" Algeria "
      ,City:"In Amenas"
      ,Code:"IAM"
    },
    {
       Country:" Bahamas "
      ,City:"Inagua"
      ,Code:"IGA"
    },
    {
       Country:" Indonesia "
      ,City:"Inanwatan"
      ,Code:"INX"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Indagen"
      ,Code:"IDN"
    },
    {
       Country:" IN "
      ,City:"Indianapolis"
      ,Code:"IND"
    },
    {
       Country:" India "
      ,City:"Indore"
      ,Code:"IDR"
    },
    {
       Country:" ON - Rail service "
      ,City:"Ingersoll"
      ,Code:"XIB"
    },
    {
       Country:" Austria "
      ,City:"Innsbruck"
      ,Code:"INN"
    },
    {
       Country:" Russia "
      ,City:"Inta"
      ,Code:"INA"
    },
    {
       Country:" MN "
      ,City:"International Falls"
      ,Code:"INL"
    },
    {
       Country:" QC "
      ,City:"Inukjuak"
      ,Code:"YPH"
    },
    {
       Country:" NT "
      ,City:"Inuvik"
      ,Code:"YEV"
    },
    {
       Country:" New Zealand "
      ,City:"Invercargill"
      ,Code:"IVC"
    },
    {
       Country:" Australia "
      ,City:"Inverell"
      ,Code:"IVR"
    },
    {
       Country:" United Kingdom "
      ,City:"Inverness"
      ,Code:"INV"
    },
    {
       Country:" CA "
      ,City:"Inyokern"
      ,Code:"IYK"
    },
    {
       Country:" Greece "
      ,City:"Ioannina"
      ,Code:"IOA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Ioma"
      ,Code:"IOP"
    },
    {
       Country:" Brazil "
      ,City:"Ipatinga"
      ,Code:"IPN"
    },
    {
       Country:" Colombia "
      ,City:"Ipiales"
      ,Code:"IPI"
    },
    {
       Country:" Philippines "
      ,City:"Ipil"
      ,Code:"IPE"
    },
    {
       Country:" Malaysia "
      ,City:"Ipoh"
      ,Code:"IPH"
    },
    {
       Country:" Vanuatu "
      ,City:"Ipota"
      ,Code:"IPA"
    },
    {
       Country:" NU "
      ,City:"Iqaluit"
      ,Code:"YFB"
    },
    {
       Country:" Chile "
      ,City:"Iquique"
      ,Code:"IQQ"
    },
    {
       Country:" Peru "
      ,City:"Iquitos"
      ,Code:"IQT"
    },
    {
       Country:" Russia "
      ,City:"Irkutsk"
      ,Code:"IKT"
    },
    {
       Country:" MI "
      ,City:"Iron Mountain"
      ,Code:"IMT"
    },
    {
       Country:" MI "
      ,City:"Ironwood"
      ,Code:"IWD"
    },
    {
       Country:" Iceland "
      ,City:"Isafjordur"
      ,Code:"IFJ"
    },
    {
       Country:" Iran "
      ,City:"Isfahan"
      ,Code:"IFN"
    },
    {
       Country:" Japan "
      ,City:"Ishigakij"
      ,Code:"ISG"
    },
    {
       Country:" Pakistan "
      ,City:"Islamabad"
      ,Code:"ISB"
    },
    {
       Country:""
      ,City:"Island Lake/Garden Hill "
      ,Code:"YIV"
    },
    {
       Country:" Canada "
      ,City:"Island Lake/Garden Hill"
      ,Code:"YIV"
    },
    {
       Country:" United Kingdom "
      ,City:"Islay"
      ,Code:"ILY"
    },
    {
       Country:" United Kingdom "
      ,City:"Isle of Man"
      ,Code:"IOM"
    },
    {
       Country:" United Kingdom - St Marys "
      ,City:"Isles of Scilly"
      ,Code:"ISC"
    },
    {
       Country:" United Kingdom - Tresco "
      ,City:"Isles of Scilly"
      ,Code:"TSO"
    },
    {
       Country:" NY "
      ,City:"Islip"
      ,Code:"ISP"
    },
    {
       Country:" Turkey "
      ,City:"Istanbul"
      ,Code:"IST"
    },
    {
       Country:" Brazil "
      ,City:"Itaituba"
      ,Code:"ITB"
    },
    {
       Country:" NY "
      ,City:"Ithaca"
      ,Code:"ITH"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Itokama"
      ,Code:"ITK"
    },
    {
       Country:" Finland "
      ,City:"Ivalo"
      ,Code:"IVL"
    },
    {
       Country:" Ukraine "
      ,City:"Ivano-Frankovsk"
      ,Code:"IFO"
    },
    {
       Country:" QC "
      ,City:"Ivujivik"
      ,Code:"YIK"
    },
    {
       Country:" Japan "
      ,City:"Iwami"
      ,Code:"IWJ"
    },
    {
       Country:" Mexico "
      ,City:"Ixtapa"
      ,Code:"ZIH"
    },
    {
       Country:" Mexico "
      ,City:"Ixtepec"
      ,Code:"IZT"
    },
    {
       Country:" Turkey "
      ,City:"Izmir"
      ,Code:"ADB"
    },
    {
       Country:" Japan "
      ,City:"Izumo"
      ,Code:"IZO"
    },
    {
       Country:" Marshall Islands "
      ,City:"Jabor"
      ,Code:"JAT"
    },
    {
       Country:" Brazil "
      ,City:"Jacareacanga"
      ,Code:"JCR"
    },
    {
       Country:" WY "
      ,City:"Jackson Hole"
      ,Code:"JAC"
    },
    {
       Country:" MS "
      ,City:"Jackson"
      ,Code:"JAN"
    },
    {
       Country:" TN "
      ,City:"Jackson"
      ,Code:"MKL"
    },
    {
       Country:" FL "
      ,City:"Jacksonville"
      ,Code:"JAX"
    },
    {
       Country:" NC "
      ,City:"Jacksonville"
      ,Code:"OAJ"
    },
    {
       Country:" Pakistan "
      ,City:"Jacobabad"
      ,Code:"JAG"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Jacquinot Bay"
      ,Code:"JAQ"
    },
    {
       Country:" India "
      ,City:"Jaipur"
      ,Code:"JAI"
    },
    {
       Country:" Indonesia "
      ,City:"Jakarta"
      ,Code:"CGK"
    },
    {
       Country:" Mexico "
      ,City:"Jalapa"
      ,Code:"JAL"
    },
    {
       Country:" Marshall Islands "
      ,City:"Jaluit Island"
      ,Code:"UIT"
    },
    {
       Country:""
      ,City:"Jambi. Indonesia "
      ,Code:"DJB"
    },
    {
       Country:" ND "
      ,City:"Jamestown"
      ,Code:"JMS"
    },
    {
       Country:" NY "
      ,City:"Jamestown"
      ,Code:"JHW"
    },
    {
       Country:" India "
      ,City:"Jamnagar"
      ,Code:"JGA"
    },
    {
       Country:" Nepal "
      ,City:"Janakpur"
      ,Code:"JKR"
    },
    {
       Country:" WI "
      ,City:"Janesville"
      ,Code:"JVL"
    },
    {
       Country:" Panama "
      ,City:"Jaque"
      ,Code:"JQE"
    },
    {
       Country:" AB - Rail service "
      ,City:"Jasper"
      ,Code:"XDH"
    },
    {
       Country:" Indonesia "
      ,City:"Jayapura"
      ,Code:"DJJ"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Jeddah"
      ,Code:"JED"
    },
    {
       Country:" Marshall Islands "
      ,City:"Jeh"
      ,Code:"JEJ"
    },
    {
       Country:" South Korea - Jeju Airport"
      ,City:"Jeju"
      ,Code:"CJU"
    },
    {
       Country:" Spain "
      ,City:"Jerez De La Frontere"
      ,Code:"XRY"
    },
    {
       Country:" United Kingdom "
      ,City:"Jersey"
      ,Code:"JER"
    },
    {
       Country:" Bangladesh "
      ,City:"Jessore"
      ,Code:"JSR"
    },
    {
       Country:" China "
      ,City:"Jiamusi"
      ,Code:"JMU"
    },
    {
       Country:" China "
      ,City:"Jiayuguan"
      ,Code:"JGN"
    },
    {
       Country:" Algeria "
      ,City:"Jijel"
      ,Code:"GJL"
    },
    {
       Country:" Ethiopia "
      ,City:"Jijiga"
      ,Code:"JIJ"
    },
    {
       Country:" Ethiopia "
      ,City:"Jimma"
      ,Code:"JIM"
    },
    {
       Country:" China "
      ,City:"Jinan"
      ,Code:"TNA"
    },
    {
       Country:" China "
      ,City:"Jingdezhen"
      ,Code:"JDZ"
    },
    {
       Country:" China "
      ,City:"Jinghong"
      ,Code:"JHG"
    },
    {
       Country:" Uganda "
      ,City:"Jinja"
      ,Code:"JIN"
    },
    {
       Country:" China "
      ,City:"Jinjiang"
      ,Code:"JJN"
    },
    {
       Country:" South Korea - Sancheon "
      ,City:"Jinju"
      ,Code:"HIN"
    },
    {
       Country:" Ethiopia "
      ,City:"Jinka"
      ,Code:"BCO"
    },
    {
       Country:" China "
      ,City:"Jinzhou"
      ,Code:"JNZ"
    },
    {
       Country:" Brazil "
      ,City:"Ji-Parana"
      ,Code:"JPR"
    },
    {
       Country:" Pakistan "
      ,City:"Jiwani"
      ,Code:"JIW"
    },
    {
       Country:" Brazil "
      ,City:"Joao Pessoa"
      ,Code:"JPA"
    },
    {
       Country:" India "
      ,City:"Jodhpur"
      ,Code:"JDH"
    },
    {
       Country:" Finland "
      ,City:"Joensuu"
      ,Code:"JOE"
    },
    {
       Country:" South Africa "
      ,City:"Johannesburg"
      ,Code:"JNB"
    },
    {
       Country:" NY "
      ,City:"Johnson City"
      ,Code:"BGM"
    },
    {
       Country:" TN "
      ,City:"Johnson City"
      ,Code:"TRI"
    },
    {
       Country:" US Minor Outlying Islands "
      ,City:"Johnston Island"
      ,Code:"JON"
    },
    {
       Country:" PA "
      ,City:"Johnstown"
      ,Code:"JST"
    },
    {
       Country:" Malaysia "
      ,City:"Johor"
      ,Code:"JHB"
    },
    {
       Country:" Brazil "
      ,City:"Joinville"
      ,Code:"JOI"
    },
    {
       Country:" QC - Rail service "
      ,City:"Joliette"
      ,Code:"XJL"
    },
    {
       Country:" India "
      ,City:"Jommu"
      ,Code:"IXJ"
    },
    {
       Country:" Nepal "
      ,City:"Jomsom"
      ,Code:"JMO"
    },
    {
       Country:" AR "
      ,City:"Jonesboro"
      ,Code:"JBR"
    },
    {
       Country:" Sweden "
      ,City:"Jonkoping"
      ,Code:"JKG"
    },
    {
       Country:" QC - Rail service "
      ,City:"Jonquiere"
      ,Code:"XJQ"
    },
    {
       Country:" MO "
      ,City:"Joplin"
      ,Code:"JLN"
    },
    {
       Country:" India "
      ,City:"Jorhat"
      ,Code:"JRH"
    },
    {
       Country:" Argentina "
      ,City:"Jose De San Martin"
      ,Code:"JSM"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Jouf"
      ,Code:"AJF"
    },
    {
       Country:" Brazil "
      ,City:"Juazeiro Do Norte"
      ,Code:"JDO"
    },
    {
       Country:" Germany "
      ,City:"Juist"
      ,Code:"JUI"
    },
    {
       Country:" Brazil "
      ,City:"Juiz De Fora"
      ,Code:"JDF"
    },
    {
       Country:" Argentina "
      ,City:"Jujuy"
      ,Code:"JUJ"
    },
    {
       Country:" Australia "
      ,City:"Julia Creek"
      ,Code:"JCK"
    },
    {
       Country:" Peru "
      ,City:"Juliaca"
      ,Code:"JUL"
    },
    {
       Country:" AK "
      ,City:"Juneau"
      ,Code:"JNU"
    },
    {
       Country:" China "
      ,City:"Juzha"
      ,Code:"JUZ"
    },
    {
       Country:" Finland "
      ,City:"Jyvaskyla"
      ,Code:"JYV"
    },
    {
       Country:" Maldives "
      ,City:"Kaadedhdhoo"
      ,Code:"KDM"
    },
    {
       Country:" Marshall Islands "
      ,City:"Kaben"
      ,Code:"KBT"
    },
    {
       Country:" Ethiopia "
      ,City:"Kabri Dar"
      ,Code:"ABK"
    },
    {
       Country:" Afghanistan "
      ,City:"Kabul"
      ,Code:"KBL"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Kabwun"
      ,Code:"KBM"
    },
    {
       Country:" Pakistan "
      ,City:"Kadanwari"
      ,Code:"KCF"
    },
    {
       Country:" Maldives "
      ,City:"Kadhonoo"
      ,Code:"KDO"
    },
    {
       Country:" Turkey "
      ,City:"Kahramanmaras"
      ,Code:"KCM"
    },
    {
       Country:" HI - Island of Maui"
      ,City:"Kahului"
      ,Code:"OGG"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Kaintiba"
      ,Code:"KZF"
    },
    {
       Country:" New Zealand "
      ,City:"Kaitaia"
      ,Code:"KAT"
    },
    {
       Country:" Finland "
      ,City:"Kajaani"
      ,Code:"KAJ"
    },
    {
       Country:" AK "
      ,City:"Kake"
      ,Code:"KAE"
    },
    {
       Country:" AK "
      ,City:"Kakhonak"
      ,Code:"KNK"
    },
    {
       Country:" MI "
      ,City:"Kalamazoo"
      ,Code:"AZO"
    },
    {
       Country:" HI - Island of Molokai"
      ,City:"Kalaupapa"
      ,Code:"LUP"
    },
    {
       Country:" Australia "
      ,City:"Kalbarri"
      ,Code:"KAX"
    },
    {
       Country:" Russia "
      ,City:"Kaliningrad"
      ,Code:"KGD"
    },
    {
       Country:" AK "
      ,City:"Kalskag"
      ,Code:"KLG"
    },
    {
       Country:" AK "
      ,City:"Kaltag"
      ,Code:"KAL"
    },
    {
       Country:" Indonesia "
      ,City:"Kambuaya"
      ,Code:"KBX"
    },
    {
       Country:" Syrian Arab Republic "
      ,City:"Kameshli"
      ,Code:"KAC"
    },
    {
       Country:" BC "
      ,City:"Kamloops"
      ,Code:"YKA"
    },
    {
       Country:" HI - Island of Hawaii"
      ,City:"Kamuela"
      ,Code:"MUE"
    },
    {
       Country:" Indonesia "
      ,City:"Kamur"
      ,Code:"KCD"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Kamusi"
      ,Code:"KUY"
    },
    {
       Country:" QC "
      ,City:"Kangiqsualujjuaq"
      ,Code:"XGR"
    },
    {
       Country:" QC "
      ,City:"Kangiqsujuaq"
      ,Code:"YWB"
    },
    {
       Country:" QC "
      ,City:"Kangirsuk"
      ,Code:"YKG"
    },
    {
       Country:" Nigeria "
      ,City:"Kano"
      ,Code:"KAN"
    },
    {
       Country:" MO "
      ,City:"Kansas City"
      ,Code:"MCI"
    },
    {
       Country:" HI - Island of Maui"
      ,City:"Kapalua"
      ,Code:"JHM"
    },
    {
       Country:" ON "
      ,City:"Kapuskasing"
      ,Code:"YYU"
    },
    {
       Country:" Pakistan - Quaid-E-Azam International "
      ,City:"Karachi"
      ,Code:"KHI"
    },
    {
       Country:" Estonia "
      ,City:"Kardia"
      ,Code:"KDL"
    },
    {
       Country:" Zimbabwe "
      ,City:"Kariba"
      ,Code:"KAB"
    },
    {
       Country:" Germany "
      ,City:"Karlsruhe/Badern Baden"
      ,Code:"FKB"
    },
    {
       Country:" Greece "
      ,City:"Karpathos"
      ,Code:"AOK"
    },
    {
       Country:" Indonesia "
      ,City:"Karubaga"
      ,Code:"KBF"
    },
    {
       Country:" AK "
      ,City:"Kasaan"
      ,Code:"KXA"
    },
    {
       Country:" Zambia "
      ,City:"Kasaba Bay"
      ,Code:"ZKB"
    },
    {
       Country:" ON "
      ,City:"Kasabonika"
      ,Code:"XKS"
    },
    {
       Country:" Zambia "
      ,City:"Kasama"
      ,Code:"KAA"
    },
    {
       Country:" Botswana "
      ,City:"Kasane"
      ,Code:"BBK"
    },
    {
       Country:" ON "
      ,City:"Kaschechewan"
      ,Code:"ZKE"
    },
    {
       Country:" AK "
      ,City:"Kasigluk"
      ,Code:"KUK"
    },
    {
       Country:" Australia "
      ,City:"Katherine"
      ,Code:"KTR"
    },
    {
       Country:" Nepal "
      ,City:"Kathmandu"
      ,Code:"KTM"
    },
    {
       Country:" Poland "
      ,City:"Katowice"
      ,Code:"KTW"
    },
    {
       Country:" HI "
      ,City:"Kauai Island/Lihue"
      ,Code:"LIH"
    },
    {
       Country:" Lithuania "
      ,City:"Kaunas"
      ,Code:"KUN"
    },
    {
       Country:" Greece "
      ,City:"Kavala"
      ,Code:"KVA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Kavieng"
      ,Code:"KVG"
    },
    {
       Country:" Myanmar "
      ,City:"Kawthaung"
      ,Code:"KAW"
    },
    {
       Country:" Turkey "
      ,City:"Kayseri"
      ,Code:"ASR"
    },
    {
       Country:" Russia "
      ,City:"Kazan"
      ,Code:"KZN"
    },
    {
       Country:" NE "
      ,City:"Kearney"
      ,Code:"EAR"
    },
    {
       Country:" NH "
      ,City:"Keene"
      ,Code:"EEN"
    },
    {
       Country:" ON "
      ,City:"Keewaywin"
      ,Code:"KEW"
    },
    {
       Country:" Greece "
      ,City:"Kefallinia"
      ,Code:"EFL"
    },
    {
       Country:" QC "
      ,City:"Kegaska"
      ,Code:"ZKG"
    },
    {
       Country:" BC "
      ,City:"Kelowna"
      ,Code:"YLW"
    },
    {
       Country:" AK "
      ,City:"Kenai"
      ,Code:"ENA"
    },
    {
       Country:" Indonesia "
      ,City:"Kendari"
      ,Code:"KDI"
    },
    {
       Country:" ON "
      ,City:"Kenora"
      ,Code:"YQK"
    },
    {
       Country:" Greece "
      ,City:"Kerkyra"
      ,Code:"CFU"
    },
    {
       Country:" AK "
      ,City:"Ketchikan"
      ,Code:"KTN"
    },
    {
       Country:" FL "
      ,City:"Key West"
      ,Code:"EYW"
    },
    {
       Country:" CO - Van service "
      ,City:"Keystone"
      ,Code:"QKS"
    },
    {
       Country:" India "
      ,City:"Khajuraho"
      ,Code:"HJR"
    },
    {
       Country:" Egypt "
      ,City:"Kharga"
      ,Code:"UVL"
    },
    {
       Country:" Ukraine "
      ,City:"Kharkov"
      ,Code:"HRK"
    },
    {
       Country:" Tajikistan "
      ,City:"Khudzhand"
      ,Code:"LBD"
    },
    {
       Country:" Pakistan "
      ,City:"Khuzdar"
      ,Code:"KDD"
    },
    {
       Country:" AK "
      ,City:"Kiana"
      ,Code:"IAN"
    },
    {
       Country:" Ukraine - Borispol "
      ,City:"Kiev"
      ,Code:"KBP"
    },
    {
       Country:" Ukraine - Zhulhany "
      ,City:"Kiev"
      ,Code:"IEV"
    },
    {
       Country:" Rwanda "
      ,City:"Kigali"
      ,Code:"KGL"
    },
    {
       Country:" Tanzania "
      ,City:"Kigoma"
      ,Code:"TKQ"
    },
    {
       Country:" TX "
      ,City:"Kilgore/Gladewater"
      ,Code:"GGG"
    },
    {
       Country:" Tanzania "
      ,City:"Kilimanjaro"
      ,Code:"JRO"
    },
    {
       Country:" TX "
      ,City:"Killeen"
      ,Code:"ILE"
    },
    {
       Country:""
      ,City:"Kimmirut/Lake Harbour NU "
      ,Code:"YLC"
    },
    {
       Country:" Canada "
      ,City:"Kimmirut/Lake Harbour"
      ,Code:"YLC"
    },
    {
       Country:" AK "
      ,City:"King Cove"
      ,Code:"KVC"
    },
    {
       Country:" AK "
      ,City:"King Salmon"
      ,Code:"AKN"
    },
    {
       Country:" ON "
      ,City:"Kingfisher Lake"
      ,Code:"KIF"
    },
    {
       Country:" AZ "
      ,City:"Kingman"
      ,Code:"IGM"
    },
    {
       Country:" TN "
      ,City:"Kingsport"
      ,Code:"TRI"
    },
    {
       Country:" Jamaica - Norman Manley "
      ,City:"Kingston"
      ,Code:"KIN"
    },
    {
       Country:" Jamaica - Tinson "
      ,City:"Kingston"
      ,Code:"KTP"
    },
    {
       Country:" ON - Norman Rogers Airport "
      ,City:"Kingston"
      ,Code:"YGK"
    },
    {
       Country:" ON - Rail service "
      ,City:"Kingston"
      ,Code:"XEG"
    },
    {
       Country:" Congo "
      ,City:"Kinshasa"
      ,Code:"FIH"
    },
    {
       Country:" AK "
      ,City:"Kipnuk"
      ,Code:"KPN"
    },
    {
       Country:" Solomon Islands "
      ,City:"Kirakira"
      ,Code:"IRA"
    },
    {
       Country:" MO "
      ,City:"Kirksville"
      ,Code:"IRK"
    },
    {
       Country:" Japan "
      ,City:"Kitadaito"
      ,Code:"KTD"
    },
    {
       Country:" ON "
      ,City:"Kitchener"
      ,Code:"YKF"
    },
    {
       Country:" Finland "
      ,City:"Kittila"
      ,Code:"KTT"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Kiunga"
      ,Code:"UNG"
    },
    {
       Country:" AK "
      ,City:"Kivalina"
      ,Code:"KVL"
    },
    {
       Country:" Kenya "
      ,City:"Kiwayu"
      ,Code:"KWY"
    },
    {
       Country:" OR "
      ,City:"Klamath Falls"
      ,Code:"LMT"
    },
    {
       Country:" AK "
      ,City:"Klawock"
      ,Code:"KLW"
    },
    {
       Country:" BC "
      ,City:"Klemtu"
      ,Code:"YKT"
    },
    {
       Country:" Ireland "
      ,City:"Knock"
      ,Code:"NOC"
    },
    {
       Country:" TN "
      ,City:"Knoxville"
      ,Code:"TYS"
    },
    {
       Country:" AK "
      ,City:"Kobuk"
      ,Code:"OBU"
    },
    {
       Country:" Japan "
      ,City:"Kochi"
      ,Code:"KCZ"
    },
    {
       Country:" AK "
      ,City:"Kodiak"
      ,Code:"ADQ"
    },
    {
       Country:" Thailand "
      ,City:"Koh Samui"
      ,Code:"USM"
    },
    {
       Country:" India "
      ,City:"Kolkata"
      ,Code:"CCU"
    },
    {
       Country:" Poland "
      ,City:"Kolobrzeg"
      ,Code:"QJY"
    },
    {
       Country:" Russia "
      ,City:"Komsomolsk Na Amure"
      ,Code:"KXK"
    },
    {
       Country:" HI - Island of Hawaii "
      ,City:"Kona"
      ,Code:"KOA"
    },
    {
       Country:" AK "
      ,City:"Kongiganak"
      ,Code:"KKH"
    },
    {
       Country:" Turkey "
      ,City:"Konya"
      ,Code:"KYA"
    },
    {
       Country:" Palau "
      ,City:"Koror"
      ,Code:"ROR"
    },
    {
       Country:" Poland "
      ,City:"Koszalin"
      ,Code:"OSZ"
    },
    {
       Country:" Malaysia "
      ,City:"Kota Bharu"
      ,Code:"KBR"
    },
    {
       Country:" Malaysia "
      ,City:"Kota Kinabalu"
      ,Code:"BKI"
    },
    {
       Country:" AK "
      ,City:"Kotlik"
      ,Code:"KOT"
    },
    {
       Country:" AK "
      ,City:"Kotzebue"
      ,Code:"OTZ"
    },
    {
       Country:" Australia"
      ,City:"Kowanyama"
      ,Code:"KWM"
    },
    {
       Country:" AK "
      ,City:"Koyukuk"
      ,Code:"KYU"
    },
    {
       Country:" India "
      ,City:"Kozhikode"
      ,Code:"CCJ"
    },
    {
       Country:" Thailand "
      ,City:"Krabi"
      ,Code:"KBV"
    },
    {
       Country:" Poland "
      ,City:"Krakow"
      ,Code:"KRK"
    },
    {
       Country:" Ukraine "
      ,City:"Krivoy Rog"
      ,Code:"KWG"
    },
    {
       Country:" Malaysia "
      ,City:"Kuala Lumpur"
      ,Code:"KUL"
    },
    {
       Country:" Malaysia "
      ,City:"Kuala Terengganu"
      ,Code:"TGG"
    },
    {
       Country:" Malaysia "
      ,City:"Kuantan"
      ,Code:"KUA"
    },
    {
       Country:" Australia"
      ,City:"Kubin Island"
      ,Code:"KUG"
    },
    {
       Country:" Malaysia "
      ,City:"Kuching"
      ,Code:"KCH"
    },
    {
       Country:" Malaysia "
      ,City:"Kudat"
      ,Code:"KUD"
    },
    {
       Country:" Libya "
      ,City:"Kufrah"
      ,Code:"AKF"
    },
    {
       Country:" NU "
      ,City:"Kugaaruk"
      ,Code:"YBB"
    },
    {
       Country:" NU "
      ,City:"Kugluktuk/Coppermine"
      ,Code:"YCO"
    },
    {
       Country:" Greenland "
      ,City:"Kulusuk"
      ,Code:"KUS"
    },
    {
       Country:" Japan "
      ,City:"Kumejima"
      ,Code:"UEO"
    },
    {
       Country:" Papau New Guinea "
      ,City:"Kundiawa"
      ,Code:"CMU"
    },
    {
       Country:" Finland "
      ,City:"Kuopio"
      ,Code:"KUO"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Kuri"
      ,Code:"KUQ"
    },
    {
       Country:" Japan "
      ,City:"Kushiro"
      ,Code:"KUH"
    },
    {
       Country:" Georgia "
      ,City:"Kutaisi"
      ,Code:"KUT"
    },
    {
       Country:" QC "
      ,City:"Kuujjuaq"
      ,Code:"YVP"
    },
    {
       Country:" QC "
      ,City:"Kuujjuarapik"
      ,Code:"YGW"
    },
    {
       Country:" Finland "
      ,City:"Kuusamo"
      ,Code:"KAO"
    },
    {
       Country:" Kuwait "
      ,City:"Kuwait"
      ,Code:"KWI"
    },
    {
       Country:" Marshall Islands "
      ,City:"Kwajalein"
      ,Code:"KWA"
    },
    {
       Country:" AK "
      ,City:"Kwethluk"
      ,Code:"KWT"
    },
    {
       Country:" AK "
      ,City:"Kwigillingok"
      ,Code:"KWK"
    },
    {
       Country:" Russia "
      ,City:"Kyzyl"
      ,Code:"KYZ"
    },
    {
       Country:" Honduras "
      ,City:"La Ceiba"
      ,Code:"LCE"
    },
    {
       Country:" Spain "
      ,City:"La Coruna"
      ,Code:"LCG"
    },
    {
       Country:" WI "
      ,City:"La Crosse"
      ,Code:"LSE"
    },
    {
       Country:" QC "
      ,City:"La Grande"
      ,Code:"YGL"
    },
    {
       Country:" Panama "
      ,City:"La Palma"
      ,Code:"PLP"
    },
    {
       Country:" Bolivia "
      ,City:"La Paz"
      ,Code:"LPB"
    },
    {
       Country:" Mexico "
      ,City:"La Paz"
      ,Code:"LAP"
    },
    {
       Country:" Argentina "
      ,City:"La Rioja"
      ,Code:"IRJ"
    },
    {
       Country:" Dominican Republic "
      ,City:"La Romana"
      ,Code:"LRM"
    },
    {
       Country:" SK "
      ,City:"La Ronge"
      ,Code:"YVC"
    },
    {
       Country:" Chile "
      ,City:"La Serena"
      ,Code:"LSC"
    },
    {
       Country:" QC "
      ,City:"La Tabatiere"
      ,Code:"ZLT"
    },
    {
       Country:" QC "
      ,City:"La Tuque"
      ,Code:"YLQ"
    },
    {
       Country:" Morocco "
      ,City:"Laayoune"
      ,Code:"EUN"
    },
    {
       Country:" Fiji "
      ,City:"Labasa"
      ,Code:"LBS"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Lablab"
      ,Code:"LAB"
    },
    {
       Country:" Indonesia "
      ,City:"Labuan Bajo"
      ,Code:"LBJ"
    },
    {
       Country:" Malaysia "
      ,City:"Labuan"
      ,Code:"LBU"
    },
    {
       Country:" MB "
      ,City:"Lac Brochet"
      ,Code:"XLB"
    },
    {
       Country:" QC - Rail service "
      ,City:"Lac Edouard"
      ,Code:"XEE"
    },
    {
       Country:" BC - Rail service "
      ,City:"Ladysmith"
      ,Code:"XEH"
    },
    {
       Country:" Marshall Islands "
      ,City:"Lae Island"
      ,Code:"LML"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Lae"
      ,Code:"LAE"
    },
    {
       Country:" IN "
      ,City:"Lafayette"
      ,Code:"LAF"
    },
    {
       Country:" LA "
      ,City:"Lafayette"
      ,Code:"LFT"
    },
    {
       Country:" Brazil "
      ,City:"Lages"
      ,Code:"LAJ"
    },
    {
       Country:" Ecuador "
      ,City:"Lago Agrio"
      ,Code:"LGQ"
    },
    {
       Country:" Argentina "
      ,City:"Lago Argentina"
      ,Code:"ING"
    },
    {
       Country:" Nigeria "
      ,City:"Lagos"
      ,Code:"LOS"
    },
    {
       Country:" Malaysia "
      ,City:"Lahadbatu"
      ,Code:"LDU"
    },
    {
       Country:" Pakistan "
      ,City:"Lahore"
      ,Code:"LHE"
    },
    {
       Country:" LA "
      ,City:"Lake Charles"
      ,Code:"LCH"
    },
    {
       Country:" AZ "
      ,City:"Lake Havasu City"
      ,Code:"HII"
    },
    {
       Country:" AK "
      ,City:"Lake Minchumina"
      ,Code:"LMA"
    },
    {
       Country:" Fiji "
      ,City:"Lakeba"
      ,Code:"LKB"
    },
    {
       Country:" Norway "
      ,City:"Lakselv"
      ,Code:"LKL"
    },
    {
       Country:" Ethiopia "
      ,City:"Lalibela"
      ,Code:"LLI"
    },
    {
       Country:" Vanuatu "
      ,City:"Lamap"
      ,Code:"LPM"
    },
    {
       Country:" Vanuatu "
      ,City:"Lamen Bay"
      ,Code:"LNB"
    },
    {
       Country:" Italy "
      ,City:"Lamezia-Terme"
      ,Code:"SUF"
    },
    {
       Country:" Thailand "
      ,City:"Lampang"
      ,Code:"LPI"
    },
    {
       Country:" Italy "
      ,City:"Lampedusa"
      ,Code:"LMP"
    },
    {
       Country:" Kenya "
      ,City:"Lamu"
      ,Code:"LAU"
    },
    {
       Country:" HI - Island of Lanai "
      ,City:"Lanai City"
      ,Code:"LNY"
    },
    {
       Country:" PA "
      ,City:"Lancaster"
      ,Code:"LNS"
    },
    {
       Country:" United Kingdom "
      ,City:"Lands End"
      ,Code:"LEQ"
    },
    {
       Country:" BC - Rail service "
      ,City:"Langford"
      ,Code:"XEJ"
    },
    {
       Country:" Indonesia "
      ,City:"Langguri"
      ,Code:"LUV"
    },
    {
       Country:" Malaysia "
      ,City:"Langkawi"
      ,Code:"LGK"
    },
    {
       Country:" France "
      ,City:"Lannion"
      ,Code:"LAI"
    },
    {
       Country:" ON "
      ,City:"Lansdowne House"
      ,Code:"YLH"
    },
    {
       Country:" MI "
      ,City:"Lansing"
      ,Code:"LAN"
    },
    {
       Country:" Spain "
      ,City:"Lanzarote"
      ,Code:"ACE"
    },
    {
       Country:" Guinea "
      ,City:"Lanzhau"
      ,Code:"LHW"
    },
    {
       Country:" China "
      ,City:"Lanzhou"
      ,Code:"ZGC"
    },
    {
       Country:" Philippines "
      ,City:"Laoag"
      ,Code:"LAO"
    },
    {
       Country:" Finland "
      ,City:"Lappeenranta"
      ,Code:"LPP"
    },
    {
       Country:" WY "
      ,City:"Laramie"
      ,Code:"LAR"
    },
    {
       Country:" Indonesia "
      ,City:"Larantuka"
      ,Code:"LKA"
    },
    {
       Country:" TX "
      ,City:"Laredo"
      ,Code:"LRD"
    },
    {
       Country:" Cyprus "
      ,City:"Larnaca"
      ,Code:"LCA"
    },
    {
       Country:" France "
      ,City:"Larochelle"
      ,Code:"LRH"
    },
    {
       Country:" Spain "
      ,City:"Las Palmas"
      ,Code:"LPA"
    },
    {
       Country:" Venezuela "
      ,City:"Las Piedras"
      ,Code:"LSP"
    },
    {
       Country:" NV "
      ,City:"Las Vegas"
      ,Code:"LAS"
    },
    {
       Country:" Syria "
      ,City:"Latakia"
      ,Code:"LTK"
    },
    {
       Country:" PA "
      ,City:"Latrobe"
      ,Code:"LBE"
    },
    {
       Country:" Fiji "
      ,City:"Laucala Island"
      ,Code:"LUC"
    },
    {
       Country:" Australia "
      ,City:"Launceston"
      ,Code:"LST"
    },
    {
       Country:" MS "
      ,City:"Laurel"
      ,Code:"PIB"
    },
    {
       Country:" Australia "
      ,City:"Laverton"
      ,Code:"LVO"
    },
    {
       Country:" Malaysia "
      ,City:"Lawas"
      ,Code:"LWY"
    },
    {
       Country:" OK "
      ,City:"Lawton"
      ,Code:"LAW"
    },
    {
       Country:" France "
      ,City:"Le Havre"
      ,Code:"LEH"
    },
    {
       Country:" France "
      ,City:"Le Mans"
      ,Code:"ZLN"
    },
    {
       Country:" France "
      ,City:"Le Puy"
      ,Code:"LPY"
    },
    {
       Country:" France "
      ,City:"Le Touquet"
      ,Code:"LTQ"
    },
    {
       Country:" MB "
      ,City:"Leaf Rapids"
      ,Code:"YLR"
    },
    {
       Country:" Australia "
      ,City:"Learmonth"
      ,Code:"LEA"
    },
    {
       Country:" NH "
      ,City:"Lebanon"
      ,Code:"LEB"
    },
    {
       Country:" United Kingdom "
      ,City:"Leeds"
      ,Code:"LBA"
    },
    {
       Country:" Philippines "
      ,City:"Legaspi"
      ,Code:"LGP"
    },
    {
       Country:" India "
      ,City:"Leh"
      ,Code:"IXL"
    },
    {
       Country:" Australia "
      ,City:"Leinster"
      ,Code:"LER"
    },
    {
       Country:" Germany "
      ,City:"Leipzig"
      ,Code:"LEJ"
    },
    {
       Country:" Norway "
      ,City:"Leknes"
      ,Code:"LKN"
    },
    {
       Country:" Greece "
      ,City:"Lemnos"
      ,Code:"LXS"
    },
    {
       Country:" Mexico "
      ,City:"Leon"
      ,Code:"BJX"
    },
    {
       Country:" Australia "
      ,City:"Leonora"
      ,Code:"LNO"
    },
    {
       Country:" AB "
      ,City:"Lethbridge"
      ,Code:"YQL"
    },
    {
       Country:" Colombia "
      ,City:"Leticia"
      ,Code:"LET"
    },
    {
       Country:" AK "
      ,City:"Levelock"
      ,Code:"KLL"
    },
    {
       Country:" WV "
      ,City:"Lewisburg"
      ,Code:"LWB"
    },
    {
       Country:" ID "
      ,City:"Lewiston"
      ,Code:"LWS"
    },
    {
       Country:" MT "
      ,City:"Lewistown"
      ,Code:"LWT"
    },
    {
       Country:" KY "
      ,City:"Lexington"
      ,Code:"LEX"
    },
    {
       Country:" China "
      ,City:"Lhasa"
      ,Code:"LXA"
    },
    {
       Country:" China "
      ,City:"Lianyungang"
      ,Code:"LYG"
    },
    {
       Country:" KS "
      ,City:"Liberal"
      ,Code:"LBL"
    },
    {
       Country:" Costa Rica "
      ,City:"Liberia"
      ,Code:"LIR"
    },
    {
       Country:" Gabon "
      ,City:"Libreville"
      ,Code:"LBV"
    },
    {
       Country:" Mozambique "
      ,City:"Lichinga"
      ,Code:"VXC"
    },
    {
       Country:" Belgium "
      ,City:"Liege"
      ,Code:"LGG"
    },
    {
       Country:" New Caledonia "
      ,City:"Lifa"
      ,Code:"LIF"
    },
    {
       Country:" Australia "
      ,City:"Lightning Ridge"
      ,Code:"LHG"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Lihir Island"
      ,Code:"LNV"
    },
    {
       Country:" HI - Island of Kaui "
      ,City:"Lihue"
      ,Code:"LIH"
    },
    {
       Country:" China "
      ,City:"Lijiang City"
      ,Code:"LJG"
    },
    {
       Country:" Marshall Islands "
      ,City:"Likiep Island"
      ,Code:"LIK"
    },
    {
       Country:" France - Lesquin "
      ,City:"Lille"
      ,Code:"LIL"
    },
    {
       Country:" France - Rail service "
      ,City:"Lille"
      ,Code:"XDB"
    },
    {
       Country:" Malawi "
      ,City:"Lilongwe"
      ,Code:"LLW"
    },
    {
       Country:" Peru "
      ,City:"Lima"
      ,Code:"LIM"
    },
    {
       Country:" Malaysia "
      ,City:"Limbang"
      ,Code:"LMN"
    },
    {
       Country:" France "
      ,City:"Limoges"
      ,Code:"LIG"
    },
    {
       Country:" NE "
      ,City:"Lincoln"
      ,Code:"LNK"
    },
    {
       Country:" Australia"
      ,City:"Lindeman Island"
      ,Code:"LDC"
    },
    {
       Country:" Tanzania "
      ,City:"Lindi"
      ,Code:"LDI"
    },
    {
       Country:" Sweden "
      ,City:"Linkoping"
      ,Code:"LPI"
    },
    {
       Country:" China "
      ,City:"Linyi"
      ,Code:"LYI"
    },
    {
       Country:" Austria "
      ,City:"Linz"
      ,Code:"LNZ"
    },
    {
       Country:" Portugal "
      ,City:"Lisbon"
      ,Code:"LIS"
    },
    {
       Country:" Australia "
      ,City:"Lismore"
      ,Code:"LSY"
    },
    {
       Country:" AR "
      ,City:"Little Rock"
      ,Code:"LIT"
    },
    {
       Country:" China "
      ,City:"Liuzhou"
      ,Code:"LZH"
    },
    {
       Country:" United Kingdom "
      ,City:"Liverpool"
      ,Code:"LPL"
    },
    {
       Country:" Zambia "
      ,City:"Livingstone"
      ,Code:"LVI"
    },
    {
       Country:" Australia"
      ,City:"Lizard Island"
      ,Code:"LZR"
    },
    {
       Country:" Slovenia "
      ,City:"Ljubliana"
      ,Code:"LJU"
    },
    {
       Country:" AB "
      ,City:"Lloydminister"
      ,Code:"YLL"
    },
    {
       Country:" Australia "
      ,City:"Lockhart River"
      ,Code:"IRG"
    },
    {
       Country:" Marshall Islands "
      ,City:"Loen"
      ,Code:"LOF"
    },
    {
       Country:" Ecuador "
      ,City:"Loja"
      ,Code:"LOH"
    },
    {
       Country:" Togo "
      ,City:"Lome"
      ,Code:"LFW"
    },
    {
       Country:" ON - Municipal Airport "
      ,City:"London"
      ,Code:"YXU"
    },
    {
       Country:" ON - Rail service "
      ,City:"London"
      ,Code:"XDQ"
    },
    {
       Country:" United Kingdom - All airports "
      ,City:"London"
      ,Code:"LON"
    },
    {
       Country:" United Kingdom - Biggin Hill "
      ,City:"London"
      ,Code:"BQH"
    },
    {
       Country:" United Kingdom - Gatwick "
      ,City:"London"
      ,Code:"LGW"
    },
    {
       Country:" United Kingdom - Heathrow "
      ,City:"London"
      ,Code:"LHR"
    },
    {
       Country:" United Kingdom - London City "
      ,City:"London"
      ,Code:"LCY"
    },
    {
       Country:" United Kingdom - Luton "
      ,City:"London"
      ,Code:"LTN"
    },
    {
       Country:" United Kingdom - Stansted "
      ,City:"London"
      ,Code:"STN"
    },
    {
       Country:" United Kingdom "
      ,City:"Londonderry"
      ,Code:"LDY"
    },
    {
       Country:" United Kingdom - Rail service "
      ,City:"London-Paddington"
      ,Code:"QQP"
    },
    {
       Country:" Brazil "
      ,City:"Londrina"
      ,Code:"LDB"
    },
    {
       Country:" Indonesia "
      ,City:"Long Apung"
      ,Code:"LPU"
    },
    {
       Country:" Malaysia "
      ,City:"Long Banga"
      ,Code:"LBP"
    },
    {
       Country:" Indonesia "
      ,City:"Long Bawan"
      ,Code:"LBW"
    },
    {
       Country:" CA "
      ,City:"Long Beach"
      ,Code:"LGB"
    },
    {
       Country:" Australia "
      ,City:"Long Island"
      ,Code:"HAP"
    },
    {
       Country:" Bahamas "
      ,City:"Long Island/Deadmans Cay"
      ,Code:"LGI"
    },
    {
       Country:" Malaysia "
      ,City:"Long Lellang"
      ,Code:"LGL"
    },
    {
       Country:" Malaysia "
      ,City:"Long Seridan"
      ,Code:"ODN"
    },
    {
       Country:" Vanuatu "
      ,City:"Longana"
      ,Code:"LOD"
    },
    {
       Country:" Australia"
      ,City:"Longreach"
      ,Code:"LRE"
    },
    {
       Country:" TX "
      ,City:"Longview"
      ,Code:"GGG"
    },
    {
       Country:" Svalbard & Jan Mayen Island "
      ,City:"Longyearbyen"
      ,Code:"LYR"
    },
    {
       Country:" Vanuatu "
      ,City:"Lonorore"
      ,Code:"LNE"
    },
    {
       Country:" WA "
      ,City:"Lopez Island"
      ,Code:"LPS"
    },
    {
       Country:" Australia "
      ,City:"Lord Howe Island"
      ,Code:"LDH"
    },
    {
       Country:" Mexico "
      ,City:"Loreto"
      ,Code:"LTO"
    },
    {
       Country:" France "
      ,City:"Lorient"
      ,Code:"LRT"
    },
    {
       Country:" CA "
      ,City:"Los Angeles"
      ,Code:"LAX"
    },
    {
       Country:" Mexico "
      ,City:"Los Cabos"
      ,Code:"SJD"
    },
    {
       Country:" Mexico "
      ,City:"Los Mochis"
      ,Code:"LMM"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Losuia"
      ,Code:"LSA"
    },
    {
       Country:" KY "
      ,City:"Louisville"
      ,Code:"SDF"
    },
    {
       Country:" France "
      ,City:"Lourdes/Tarbes"
      ,Code:"LDE"
    },
    {
       Country:" CO - Bus service "
      ,City:"Loveland/Fort Collins"
      ,Code:"QWF"
    },
    {
       Country:" CO - Municipal Airport "
      ,City:"Loveland/Fort Collins"
      ,Code:"FNL"
    },
    {
       Country:" Mexico "
      ,City:"Lozaro Cardenas"
      ,Code:"LZC"
    },
    {
       Country:" Angola "
      ,City:"Luanda"
      ,Code:"LAD"
    },
    {
       Country:" Angola "
      ,City:"Luanda"
      ,Code:"LAD"
    },
    {
       Country:" Laos "
      ,City:"Luang Namtha"
      ,Code:"LXG"
    },
    {
       Country:" Laos "
      ,City:"Luang Prabang"
      ,Code:"LPQ"
    },
    {
       Country:" TX "
      ,City:"Lubbock"
      ,Code:"LBB"
    },
    {
       Country:" India "
      ,City:"Lucknow"
      ,Code:"LKO"
    },
    {
       Country:" Namibia "
      ,City:"Luderitz"
      ,Code:"LUD"
    },
    {
       Country:" Switzerland "
      ,City:"Lugano"
      ,Code:"LUG"
    },
    {
       Country:" Uganda "
      ,City:"Lugansk"
      ,Code:"VSG"
    },
    {
       Country:" Nepal "
      ,City:"Lukla"
      ,Code:"LUA"
    },
    {
       Country:" Sweden "
      ,City:"Lulea"
      ,Code:"LLA"
    },
    {
       Country:" Congo "
      ,City:"Lumbashi"
      ,Code:"FBM"
    },
    {
       Country:" China "
      ,City:"Luoyang"
      ,Code:"LYA"
    },
    {
       Country:" Zambia "
      ,City:"Lusaka"
      ,Code:"LUN"
    },
    {
       Country:" NT "
      ,City:"Lutselke/Snowdrift"
      ,Code:"YSG"
    },
    {
       Country:" Indonesia "
      ,City:"Luwuk"
      ,Code:"LUW"
    },
    {
       Country:" Luxembourg "
      ,City:"Luxembourg"
      ,Code:"LUX"
    },
    {
       Country:" China "
      ,City:"Luxi"
      ,Code:"LUM"
    },
    {
       Country:" Egypt "
      ,City:"Luxor"
      ,Code:"LXR"
    },
    {
       Country:" China "
      ,City:"Luzhou"
      ,Code:"LZO"
    },
    {
       Country:" Ukraine "
      ,City:"Lvov"
      ,Code:"LWO"
    },
    {
       Country:" Sweden "
      ,City:"Lyoksele"
      ,Code:"LYC"
    },
    {
       Country:" France - Lyon Part-Dieu Rail service "
      ,City:"Lyon"
      ,Code:"XYD"
    },
    {
       Country:" France - Satolas "
      ,City:"Lyon"
      ,Code:"LYS"
    },
    {
       Country:" Netherlands "
      ,City:"Maastricht"
      ,Code:"MST"
    },
    {
       Country:" Australia "
      ,City:"Mabuiag Island"
      ,Code:"UBB"
    },
    {
       Country:" Brazil "
      ,City:"Macapa"
      ,Code:"MCP"
    },
    {
       Country:" Ecuador "
      ,City:"Macas"
      ,Code:"XMS"
    },
    {
       Country:" China "
      ,City:"Macau"
      ,Code:"MFM"
    },
    {
       Country:" Brazil "
      ,City:"Maceio"
      ,Code:"MCZ"
    },
    {
       Country:" Ecuador "
      ,City:"Machala"
      ,Code:"MCH"
    },
    {
       Country:" Australia"
      ,City:"Mackay"
      ,Code:"MKY"
    },
    {
       Country:" GA "
      ,City:"Macon"
      ,Code:"MCN"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Madang"
      ,Code:"MAG"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Madinah"
      ,Code:"MED"
    },
    {
       Country:" WI "
      ,City:"Madison"
      ,Code:"MSN"
    },
    {
       Country:" OR "
      ,City:"Madras"
      ,Code:"MDJ"
    },
    {
       Country:" Spain "
      ,City:"Madrid"
      ,Code:"MAD"
    },
    {
       Country:" India "
      ,City:"Madurai"
      ,Code:"IXM"
    },
    {
       Country:" Thailand "
      ,City:"Mae Hong Son"
      ,Code:"HGN"
    },
    {
       Country:" Thailand "
      ,City:"Mae Sot"
      ,Code:"MAQ"
    },
    {
       Country:" Vanuatu "
      ,City:"Maewo"
      ,Code:"MWF"
    },
    {
       Country:" Tanzania "
      ,City:"Mafia"
      ,Code:"MFA"
    },
    {
       Country:" Russia "
      ,City:"Magadan"
      ,Code:"GDX"
    },
    {
       Country:" Russia "
      ,City:"Magnitogorsk"
      ,Code:"MQF"
    },
    {
       Country:" Madagascar "
      ,City:"Mahanoro"
      ,Code:"VVB"
    },
    {
       Country:" Seychelles "
      ,City:"Mahe Island"
      ,Code:"SEZ"
    },
    {
       Country:" Madagascar "
      ,City:"Maintirano"
      ,Code:"MXT"
    },
    {
       Country:" Cape Verde "
      ,City:"Maio"
      ,Code:"MMO"
    },
    {
       Country:" Marshall Islands "
      ,City:"Majkin"
      ,Code:"MJE"
    },
    {
       Country:" Madagascar "
      ,City:"Majunga"
      ,Code:"MJN"
    },
    {
       Country:" Marshall Islands "
      ,City:"Majuro"
      ,Code:"MAJ"
    },
    {
       Country:" Ethiopia "
      ,City:"Makale"
      ,Code:"MQX"
    },
    {
       Country:" Russia "
      ,City:"Makhachkala"
      ,Code:"MCX"
    },
    {
       Country:" Gabon "
      ,City:"Makokou"
      ,Code:"MKU"
    },
    {
       Country:" Taiwan "
      ,City:"Makung"
      ,Code:"MZG"
    },
    {
       Country:" Equatorial Guinea "
      ,City:"Malabo"
      ,Code:"SSG"
    },
    {
       Country:" Malaysia "
      ,City:"Malacca"
      ,Code:"MKZ"
    },
    {
       Country:" Spain "
      ,City:"Malaga"
      ,Code:"AGP"
    },
    {
       Country:" Sudan "
      ,City:"Malakai"
      ,Code:"MAK"
    },
    {
       Country:" Argentina "
      ,City:"Malargue"
      ,Code:"LGS"
    },
    {
       Country:" Turkey "
      ,City:"Malatya"
      ,Code:"MLX"
    },
    {
       Country:" Maldives "
      ,City:"Male"
      ,Code:"MLE"
    },
    {
       Country:" Kenya "
      ,City:"Malindi"
      ,Code:"MYD"
    },
    {
       Country:" Sweden "
      ,City:"Malmo"
      ,Code:"MMX"
    },
    {
       Country:" Marshall Islands "
      ,City:"Maloelap Island"
      ,Code:"MAV"
    },
    {
       Country:" Fiji "
      ,City:"Malololailai"
      ,Code:"PTF"
    },
    {
       Country:" Malta "
      ,City:"Malta"
      ,Code:"MLA"
    },
    {
       Country:" Madagascar "
      ,City:"Mampikony"
      ,Code:"WMP"
    },
    {
       Country:" Fiji "
      ,City:"Mana Island"
      ,Code:"MNF"
    },
    {
       Country:" Indonesia "
      ,City:"Manado"
      ,Code:"MDC"
    },
    {
       Country:" Nicaragua "
      ,City:"Managua"
      ,Code:"MGA"
    },
    {
       Country:" Madagascar "
      ,City:"Manakara"
      ,Code:"WVK"
    },
    {
       Country:" Madagascar "
      ,City:"Mananara"
      ,Code:"WMR"
    },
    {
       Country:" Nepal "
      ,City:"Manang"
      ,Code:"NGX"
    },
    {
       Country:" Madagascar "
      ,City:"Mananjary"
      ,Code:"MNJ"
    },
    {
       Country:" Brazil "
      ,City:"Manaus"
      ,Code:"MAO"
    },
    {
       Country:" NH "
      ,City:"Manchester"
      ,Code:"MHT"
    },
    {
       Country:" United Kingdom "
      ,City:"Manchester"
      ,Code:"MAN"
    },
    {
       Country:" Myanmar "
      ,City:"Mandalay"
      ,Code:"MDL"
    },
    {
       Country:" Madagascar "
      ,City:"Mandritsara"
      ,Code:"WMA"
    },
    {
       Country:" Cook Islands "
      ,City:"Mangaia Island"
      ,Code:"MGS"
    },
    {
       Country:" India "
      ,City:"Mangalore"
      ,Code:"IXE"
    },
    {
       Country:" Bahamas "
      ,City:"Mangrove Cay"
      ,Code:"MAY"
    },
    {
       Country:" Zambia "
      ,City:"Mangu"
      ,Code:"MNR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Manguna"
      ,Code:"MFO"
    },
    {
       Country:" KS "
      ,City:"Manhattan"
      ,Code:"MHK"
    },
    {
       Country:" French Polynesia "
      ,City:"Manihi"
      ,Code:"XMH"
    },
    {
       Country:" Cook Islands "
      ,City:"Manihiki Island"
      ,Code:"MHX"
    },
    {
       Country:" Philippines "
      ,City:"Manila"
      ,Code:"MNL"
    },
    {
       Country:" Australia "
      ,City:"Maningrioa"
      ,Code:"MNG"
    },
    {
       Country:" MI "
      ,City:"Manistee"
      ,Code:"MBL"
    },
    {
       Country:" Colombia "
      ,City:"Manizales"
      ,Code:"MZL"
    },
    {
       Country:" Madagascar "
      ,City:"Manja"
      ,Code:"MJA"
    },
    {
       Country:" MN "
      ,City:"Mankato"
      ,Code:"MKT"
    },
    {
       Country:" AK "
      ,City:"Manley Hot Springs"
      ,Code:"MLY"
    },
    {
       Country:" Germany "
      ,City:"Mannheim"
      ,Code:"MHG"
    },
    {
       Country:" AK "
      ,City:"Manokotak"
      ,Code:"KMO"
    },
    {
       Country:" Indonesia "
      ,City:"Manokwari"
      ,Code:"MKW"
    },
    {
       Country:" United Kingdom "
      ,City:"Manston"
      ,Code:"MSE"
    },
    {
       Country:" Ecuador "
      ,City:"Manta"
      ,Code:"MEC"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Manus Island"
      ,Code:"MAS"
    },
    {
       Country:" Cuba "
      ,City:"Manzanillo"
      ,Code:"MZO"
    },
    {
       Country:" Mexico "
      ,City:"Manzanillo"
      ,Code:"ZLO"
    },
    {
       Country:" Swaziland "
      ,City:"Manzini"
      ,Code:"MTS"
    },
    {
       Country:" Chad "
      ,City:"Mao"
      ,Code:"AMO"
    },
    {
       Country:" Western Samoa "
      ,City:"Maota Savaii Is"
      ,Code:"MXS"
    },
    {
       Country:" Mozambique "
      ,City:"Maputo"
      ,Code:"MPM"
    },
    {
       Country:" Argentina "
      ,City:"Mar Del Plata"
      ,Code:"MDQ"
    },
    {
       Country:" Kenya "
      ,City:"Mara Lodges"
      ,Code:"MRE"
    },
    {
       Country:" Brazil "
      ,City:"Maraba"
      ,Code:"MAB"
    },
    {
       Country:" Venezuela "
      ,City:"Maracaibo"
      ,Code:"MAR"
    },
    {
       Country:" Venezuela "
      ,City:"Maracay"
      ,Code:"MYC"
    },
    {
       Country:" New Caledonia "
      ,City:"Mare"
      ,Code:"MEE"
    },
    {
       Country:" South Africa "
      ,City:"Margate"
      ,Code:"MGH"
    },
    {
       Country:" Slovenia "
      ,City:"Maribor"
      ,Code:"MBX"
    },
    {
       Country:" Finland "
      ,City:"Mariehamn"
      ,Code:"MHQ"
    },
    {
       Country:" OH/Parkersburg"
      ,City:"Marietta"
      ,Code:"PKB"
    },
    {
       Country:" Greenland "
      ,City:"Mariitsoq"
      ,Code:"JSU"
    },
    {
       Country:" Brazil "
      ,City:"Marilia"
      ,Code:"MII"
    },
    {
       Country:" Brazil "
      ,City:"Maringa"
      ,Code:"MGF"
    },
    {
       Country:" IL "
      ,City:"Marion"
      ,Code:"MWA"
    },
    {
       Country:" Ukraine "
      ,City:"Mariupol"
      ,Code:"MPW"
    },
    {
       Country:" Madagascar "
      ,City:"Maroantsetra"
      ,Code:"WMN"
    },
    {
       Country:" Cameroon "
      ,City:"Marova"
      ,Code:"MVR"
    },
    {
       Country:" MI "
      ,City:"Marquette"
      ,Code:"MQT"
    },
    {
       Country:" France "
      ,City:"Marseille"
      ,Code:"MRS"
    },
    {
       Country:" Bahamas "
      ,City:"Marsh Harbour"
      ,Code:"MHH"
    },
    {
       Country:" AK "
      ,City:"Marshall"
      ,Code:"MLL"
    },
    {
       Country:" MA "
      ,City:"Martha's Vineyard"
      ,Code:"MVY"
    },
    {
       Country:" PA "
      ,City:"Martinsburg"
      ,Code:"AOO"
    },
    {
       Country:" Malaysia "
      ,City:"Marudi"
      ,Code:"MUR"
    },
    {
       Country:" Australia"
      ,City:"Maryborough"
      ,Code:"MBH"
    },
    {
       Country:" NL "
      ,City:"Mary's Harbour"
      ,Code:"YMH"
    },
    {
       Country:" Philippines "
      ,City:"Masbate"
      ,Code:"MBT"
    },
    {
       Country:" Lesotho "
      ,City:"Maseru"
      ,Code:"MSU"
    },
    {
       Country:" Iran "
      ,City:"Mashad"
      ,Code:"MHD"
    },
    {
       Country:" IA "
      ,City:"Mason City"
      ,Code:"MCW"
    },
    {
       Country:" NY "
      ,City:"Massena"
      ,Code:"MSS"
    },
    {
       Country:" Mexico "
      ,City:"Matamoros"
      ,Code:"MAM"
    },
    {
       Country:" Indonesia "
      ,City:"Mataram"
      ,Code:"AMI"
    },
    {
       Country:" Japan "
      ,City:"Matsumoto"
      ,Code:"MMJ"
    },
    {
       Country:" Japan "
      ,City:"Matsuyama"
      ,Code:"MYJ"
    },
    {
       Country:" Venezuela "
      ,City:"Maturin"
      ,Code:"MUN"
    },
    {
       Country:" HI "
      ,City:"Maui"
      ,Code:"OGG"
    },
    {
       Country:" Cook Islands "
      ,City:"Mauke Island"
      ,Code:"MUK"
    },
    {
       Country:" Myanmar "
      ,City:"Maulmyine"
      ,Code:"MNU"
    },
    {
       Country:" Indonesia "
      ,City:"Maumere"
      ,Code:"MOF"
    },
    {
       Country:" Botswana "
      ,City:"Maun"
      ,Code:"MUB"
    },
    {
       Country:" French Polynesia "
      ,City:"Maupiti"
      ,Code:"MAU"
    },
    {
       Country:" Mauritius "
      ,City:"Mauritius"
      ,Code:"MRU"
    },
    {
       Country:" ON - Rail service "
      ,City:"Maxville"
      ,Code:"XID"
    },
    {
       Country:" Bahamas "
      ,City:"Mayaguana"
      ,Code:"MYG"
    },
    {
       Country:" Puerto Rico "
      ,City:"Mayaguez"
      ,Code:"MAZ"
    },
    {
       Country:" Mexico "
      ,City:"Mazatlan"
      ,Code:"MZT"
    },
    {
       Country:" Congo "
      ,City:"Mbandaka"
      ,Code:"MDK"
    },
    {
       Country:" Congo "
      ,City:"Mbuji Mayi"
      ,Code:"MJM"
    },
    {
       Country:" TX "
      ,City:"Mcallen"
      ,Code:"MFE"
    },
    {
       Country:" Australia "
      ,City:"Mcarthur River"
      ,Code:"MCV"
    },
    {
       Country:" NE "
      ,City:"Mccook"
      ,Code:"MCK"
    },
    {
       Country:" AK "
      ,City:"Mcgrath"
      ,Code:"MCG"
    },
    {
       Country:" Indonesia "
      ,City:"Medan"
      ,Code:"MES"
    },
    {
       Country:" Colombia - Enrique Olaya Herrera "
      ,City:"Medellin"
      ,Code:"EOH"
    },
    {
       Country:" Colombia - Jose Marie Cordova "
      ,City:"Medellin"
      ,Code:"MDE"
    },
    {
       Country:" OR "
      ,City:"Medford"
      ,Code:"MFR"
    },
    {
       Country:" AB "
      ,City:"Medicine Hat"
      ,Code:"YXH"
    },
    {
       Country:" Australia "
      ,City:"Meekatharra"
      ,Code:"MKR"
    },
    {
       Country:" Norway "
      ,City:"Mehamn"
      ,Code:"MEH"
    },
    {
       Country:" China "
      ,City:"Meixian"
      ,Code:"MXZ"
    },
    {
       Country:" Marshall Islands "
      ,City:"Mejit Island"
      ,Code:"MJB"
    },
    {
       Country:" Ethiopia "
      ,City:"Mekane Selam"
      ,Code:"MKS"
    },
    {
       Country:" AK "
      ,City:"Mekoryuk"
      ,Code:"MYU"
    },
    {
       Country:" FL "
      ,City:"Melbourne"
      ,Code:"MLB"
    },
    {
       Country:" Australia "
      ,City:"Melbourne"
      ,Code:"MEL"
    },
    {
       Country:" Spain "
      ,City:"Melilla"
      ,Code:"MLN"
    },
    {
       Country:" SK - Rail service "
      ,City:"Melville"
      ,Code:"XEK"
    },
    {
       Country:" Japan "
      ,City:"Memanbetsu"
      ,Code:"MMB"
    },
    {
       Country:" TN "
      ,City:"Memphis"
      ,Code:"MEM"
    },
    {
       Country:" Ethiopia "
      ,City:"Mendi"
      ,Code:"NDM"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Mendi"
      ,Code:"MDU"
    },
    {
       Country:" Argentina "
      ,City:"Mendoza"
      ,Code:"MDZ"
    },
    {
       Country:" Spain "
      ,City:"Menorca"
      ,Code:"MAH"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Menyamya"
      ,Code:"MYX"
    },
    {
       Country:" Indonesia "
      ,City:"Merauke"
      ,Code:"MKQ"
    },
    {
       Country:" Sudan "
      ,City:"Merave"
      ,Code:"MWE"
    },
    {
       Country:" CA "
      ,City:"Merced"
      ,Code:"MCE"
    },
    {
       Country:" Indonesia "
      ,City:"Merdey"
      ,Code:"RDE"
    },
    {
       Country:" Mexico "
      ,City:"Merida"
      ,Code:"MID"
    },
    {
       Country:" Venezuela "
      ,City:"Merida"
      ,Code:"MRD"
    },
    {
       Country:" MS "
      ,City:"Meridian"
      ,Code:"MEI"
    },
    {
       Country:" Australia "
      ,City:"Merimbula"
      ,Code:"MIM"
    },
    {
       Country:" Egypt "
      ,City:"Mersa Matruh"
      ,Code:"MUH"
    },
    {
       Country:" AK "
      ,City:"Metlakatla"
      ,Code:"MTM"
    },
    {
       Country:" France "
      ,City:"Metz/Nancy"
      ,Code:"ETZ"
    },
    {
       Country:" Mexico "
      ,City:"Mexicali"
      ,Code:"MXL"
    },
    {
       Country:" Mexico "
      ,City:"Mexico City"
      ,Code:"MEX"
    },
    {
       Country:" AK "
      ,City:"Meyers Chuck"
      ,Code:"WMK"
    },
    {
       Country:" Zambia "
      ,City:"Mfume"
      ,Code:"MFU"
    },
    {
       Country:" FL - International "
      ,City:"Miami"
      ,Code:"MIA"
    },
    {
       Country:" FL - Sea Plane Base "
      ,City:"Miami"
      ,Code:"MPB"
    },
    {
       Country:" Madagascar "
      ,City:"Miandrivazo"
      ,Code:"ZVA"
    },
    {
       Country:" Turks and Caicos "
      ,City:"Middle Caicos"
      ,Code:"MDS"
    },
    {
       Country:" MI "
      ,City:"Midland"
      ,Code:"MBS"
    },
    {
       Country:" TX "
      ,City:"Midland/Odessa"
      ,Code:"MAF"
    },
    {
       Country:" US Minor Outlying Islands "
      ,City:"Midway Island"
      ,Code:"MDY"
    },
    {
       Country:" Finland "
      ,City:"Mikkeli"
      ,Code:"MIK"
    },
    {
       Country:" Greece "
      ,City:"Mikonos"
      ,Code:"JMK"
    },
    {
       Country:" Italy - Linate "
      ,City:"Milan"
      ,Code:"LIN"
    },
    {
       Country:" Italy - Malpensa "
      ,City:"Milan"
      ,Code:"MXP"
    },
    {
       Country:" Italy - Orio Al Serio "
      ,City:"Milan"
      ,Code:"BGY"
    },
    {
       Country:" Italy - Parma "
      ,City:"Milan"
      ,Code:"PMF"
    },
    {
       Country:" Australia "
      ,City:"Mildura"
      ,Code:"MQL"
    },
    {
       Country:" MT "
      ,City:"Miles City"
      ,Code:"MLS"
    },
    {
       Country:" Marshall Islands "
      ,City:"Mili Island"
      ,Code:"MIJ"
    },
    {
       Country:" Australia "
      ,City:"Milingimbi"
      ,Code:"MGT"
    },
    {
       Country:" WI "
      ,City:"Milwaukee"
      ,Code:"MKE"
    },
    {
       Country:" Japan "
      ,City:"Minami Daito"
      ,Code:"MMD"
    },
    {
       Country:" Mexico "
      ,City:"Minatitla"
      ,Code:"MTT"
    },
    {
       Country:" Indonesia "
      ,City:"Mindiptana"
      ,Code:"MDP"
    },
    {
       Country:" Russia "
      ,City:"Mineralnye Vody"
      ,Code:"MRV"
    },
    {
       Country:" MN "
      ,City:"Minneapolis"
      ,Code:"MSP"
    },
    {
       Country:" ND "
      ,City:"Minot"
      ,Code:"MOT"
    },
    {
       Country:" Belarus - Minsk International 1 "
      ,City:"Minsk"
      ,Code:"MHP"
    },
    {
       Country:" Belarus - Minsk International 2 "
      ,City:"Minsk"
      ,Code:"MSQ"
    },
    {
       Country:" AK "
      ,City:"Minto"
      ,Code:"MNT"
    },
    {
       Country:" NB - Rail service "
      ,City:"Miramichi"
      ,Code:"XEY"
    },
    {
       Country:" Malaysia "
      ,City:"Miri"
      ,Code:"MYY"
    },
    {
       Country:" Russia "
      ,City:"Mirnyj"
      ,Code:"MJZ"
    },
    {
       Country:" Japan "
      ,City:"Misawa"
      ,Code:"MSJ"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Misima Island"
      ,Code:"MIS"
    },
    {
       Country:" TX "
      ,City:"Mission"
      ,Code:"MFE"
    },
    {
       Country:" MT "
      ,City:"Missoula"
      ,Code:"MSO"
    },
    {
       Country:" Libya "
      ,City:"Misurata"
      ,Code:"MRA"
    },
    {
       Country:" Cook Islands "
      ,City:"Mitiaro Island"
      ,Code:"MOI"
    },
    {
       Country:" Japan "
      ,City:"MiyakeJima"
      ,Code:"MYE"
    },
    {
       Country:" Japan "
      ,City:"Miyako Jima"
      ,Code:"MMY"
    },
    {
       Country:" Ethiopia "
      ,City:"Mizan Teferi"
      ,Code:"MTF"
    },
    {
       Country:" Norway "
      ,City:"Mo I Rana"
      ,Code:"MQN"
    },
    {
       Country:" Cuba "
      ,City:"Moa"
      ,Code:"MOA"
    },
    {
       Country:" UT "
      ,City:"Moab"
      ,Code:"CNY"
    },
    {
       Country:" Fiji "
      ,City:"Moala"
      ,Code:"MFJ"
    },
    {
       Country:" Indonesia "
      ,City:"Moanamani"
      ,Code:"ONI"
    },
    {
       Country:" Congo "
      ,City:"Moanda"
      ,Code:"MNB"
    },
    {
       Country:" Gabon "
      ,City:"Moanda"
      ,Code:"MFF"
    },
    {
       Country:" AL "
      ,City:"Mobile"
      ,Code:"MOB"
    },
    {
       Country:" CA "
      ,City:"Modesto"
      ,Code:"MOD"
    },
    {
       Country:" Somalia "
      ,City:"Mogadishu"
      ,Code:"MGQ"
    },
    {
       Country:" Denmark "
      ,City:"Mohenjodaro"
      ,Code:"MJD"
    },
    {
       Country:" South Korea "
      ,City:"Mokpo"
      ,Code:"MPK"
    },
    {
       Country:" Namibia "
      ,City:"Mokuti Lodge"
      ,Code:"OKU"
    },
    {
       Country:" Norway "
      ,City:"Molde"
      ,Code:"MOL"
    },
    {
       Country:" IL "
      ,City:"Moline"
      ,Code:"MLI"
    },
    {
       Country:" Kenya "
      ,City:"Mombasa"
      ,Code:"MBA"
    },
    {
       Country:" Tunisia "
      ,City:"Monastir"
      ,Code:"MIR"
    },
    {
       Country:" Japan "
      ,City:"Monbetsu"
      ,Code:"MBE"
    },
    {
       Country:" Mexico "
      ,City:"Monclova"
      ,Code:"LOV"
    },
    {
       Country:" NB - Airport "
      ,City:"Moncton"
      ,Code:"YQM"
    },
    {
       Country:" NB - Rail service "
      ,City:"Moncton"
      ,Code:"XDP"
    },
    {
       Country:" Australia "
      ,City:"Monkey Mia"
      ,Code:"MJK"
    },
    {
       Country:" Solomon Islands "
      ,City:"Mono"
      ,Code:"MNY"
    },
    {
       Country:" LA "
      ,City:"Monroe"
      ,Code:"MLU"
    },
    {
       Country:" Liberia "
      ,City:"Monrovia"
      ,Code:"ROB"
    },
    {
       Country:" QC "
      ,City:"Mont Joli"
      ,Code:"YYY"
    },
    {
       Country:" Monaco "
      ,City:"Monte Carlo"
      ,Code:"MCM"
    },
    {
       Country:" Brazil "
      ,City:"Monte Dourado"
      ,Code:"MEU"
    },
    {
       Country:" Jamaica "
      ,City:"Montego Bay"
      ,Code:"MBJ"
    },
    {
       Country:" CA "
      ,City:"Monterey"
      ,Code:"MRY"
    },
    {
       Country:" Colombia "
      ,City:"Monteria"
      ,Code:"MTR"
    },
    {
       Country:" Mexico "
      ,City:"Monterrey"
      ,Code:"MTY"
    },
    {
       Country:" Brazil "
      ,City:"Montes Claros"
      ,Code:"MOC"
    },
    {
       Country:" Uruguay "
      ,City:"Montevideo"
      ,Code:"MVD"
    },
    {
       Country:" AL "
      ,City:"Montgomery"
      ,Code:"MGM"
    },
    {
       Country:" France "
      ,City:"Montpellier"
      ,Code:"MPL"
    },
    {
       Country:" QC - all airports "
      ,City:"Montreal"
      ,Code:"YMQ"
    },
    {
       Country:" QC - Dorval "
      ,City:"Montreal"
      ,Code:"YUL"
    },
    {
       Country:" QC - Dorval Rail service "
      ,City:"Montreal"
      ,Code:"XAX"
    },
    {
       Country:" QC - Downtown Rail service "
      ,City:"Montreal"
      ,Code:"YMY"
    },
    {
       Country:" QC - Mirabel "
      ,City:"Montreal"
      ,Code:"YMX"
    },
    {
       Country:" QC - St Lambert Rail service "
      ,City:"Montreal"
      ,Code:"XLM"
    },
    {
       Country:" CO "
      ,City:"Montrose"
      ,Code:"MTJ"
    },
    {
       Country:" Montserrat "
      ,City:"Montserrat"
      ,Code:"MNI"
    },
    {
       Country:" French Polynesia "
      ,City:"Moorea"
      ,Code:"MOZ"
    },
    {
       Country:" ON "
      ,City:"Moosonee"
      ,Code:"YMO"
    },
    {
       Country:" Mali "
      ,City:"Mopti"
      ,Code:"MZI"
    },
    {
       Country:" Sweden "
      ,City:"Mora"
      ,Code:"MXX"
    },
    {
       Country:" Madagascar "
      ,City:"Morafenobe"
      ,Code:"TVA"
    },
    {
       Country:" Madagascar "
      ,City:"Morambe"
      ,Code:"MXM"
    },
    {
       Country:" Australia"
      ,City:"Moranbah"
      ,Code:"MOV"
    },
    {
       Country:" Australia "
      ,City:"Moree"
      ,Code:"MRZ"
    },
    {
       Country:" Mexico "
      ,City:"Morelia"
      ,Code:"MLM"
    },
    {
       Country:" WV "
      ,City:"Morgantown"
      ,Code:"MGW"
    },
    {
       Country:" Japan "
      ,City:"Morioka"
      ,Code:"HNA"
    },
    {
       Country:" Australia"
      ,City:"Mornington"
      ,Code:"ONG"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Moro"
      ,Code:"MXH"
    },
    {
       Country:" Madagascar "
      ,City:"Morondava"
      ,Code:"MOQ"
    },
    {
       Country:" Comoros "
      ,City:"Moroni"
      ,Code:"HAH"
    },
    {
       Country:" Australia "
      ,City:"Moruya"
      ,Code:"MYA"
    },
    {
       Country:" Russia - all locations "
      ,City:"Moscow"
      ,Code:"MOW"
    },
    {
       Country:" Russia - Bykovo "
      ,City:"Moscow"
      ,Code:"BKA"
    },
    {
       Country:" Russia - Domodedovo "
      ,City:"Moscow"
      ,Code:"DME"
    },
    {
       Country:" Russia - Sheremetyevo "
      ,City:"Moscow"
      ,Code:"SVO"
    },
    {
       Country:" Russia - Vnukovo "
      ,City:"Moscow"
      ,Code:"VKO"
    },
    {
       Country:" WA "
      ,City:"Moses Lake"
      ,Code:"MWH"
    },
    {
       Country:" Norway "
      ,City:"Mosjoen"
      ,Code:"MJF"
    },
    {
       Country:" Bosnia and Herzegovina "
      ,City:"Mostar"
      ,Code:"OMO"
    },
    {
       Country:" Vanuatu "
      ,City:"Mota Lava"
      ,Code:"MTV"
    },
    {
       Country:" Gabon "
      ,City:"Mouila"
      ,Code:"MJL"
    },
    {
       Country:" New Zealand "
      ,City:"Mount Cook"
      ,Code:"MON"
    },
    {
       Country:" Australia "
      ,City:"Mount Gambier"
      ,Code:"MGB"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Mount Hagen"
      ,Code:"HGU"
    },
    {
       Country:" VI"
      ,City:"Mount Hotham"
      ,Code:"MHU"
    },
    {
       Country:" Australia "
      ,City:"Mount Isa"
      ,Code:"ISA"
    },
    {
       Country:" Australia "
      ,City:"Mount Keith"
      ,Code:"WME"
    },
    {
       Country:" Australia "
      ,City:"Mount Magnet"
      ,Code:"MMG"
    },
    {
       Country:" Falkland Islands "
      ,City:"Mount Pleasant"
      ,Code:"MPN"
    },
    {
       Country:" AR "
      ,City:"Mountain Home"
      ,Code:"WMH"
    },
    {
       Country:" AK "
      ,City:"Mountain Village"
      ,Code:"MOU"
    },
    {
       Country:" Namibia "
      ,City:"Mpacha"
      ,Code:"MPA"
    },
    {
       Country:" Tanzania "
      ,City:"Mtwara"
      ,Code:"MYW"
    },
    {
       Country:" Brazil "
      ,City:"Mucuri"
      ,Code:"MVS"
    },
    {
       Country:" China "
      ,City:"Mudanjiang"
      ,Code:"MDG"
    },
    {
       Country:" Australia "
      ,City:"Mudgee"
      ,Code:"DGE"
    },
    {
       Country:" Germany "
      ,City:"Muenster"
      ,Code:"FMO"
    },
    {
       Country:" Malaysia "
      ,City:"Mukan"
      ,Code:"MKM"
    },
    {
       Country:" France "
      ,City:"Mulhouse"
      ,Code:"MLH"
    },
    {
       Country:" Indonesia "
      ,City:"Mulia"
      ,Code:"LII"
    },
    {
       Country:" Pakistan "
      ,City:"Multan"
      ,Code:"MUX"
    },
    {
       Country:" Malaysia "
      ,City:"Mulu"
      ,Code:"MZV"
    },
    {
       Country:" India "
      ,City:"Mumbai"
      ,Code:"BOM"
    },
    {
       Country:" Solomon Islands "
      ,City:"Munda"
      ,Code:"MUA"
    },
    {
       Country:" Germany "
      ,City:"Munich"
      ,Code:"MUC"
    },
    {
       Country:" Spain "
      ,City:"Murcia"
      ,Code:"MJV"
    },
    {
       Country:" Russia "
      ,City:"Murmansk"
      ,Code:"MMK"
    },
    {
       Country:" Australia"
      ,City:"Murray Island"
      ,Code:"MYI"
    },
    {
       Country:" Turkey "
      ,City:"Mus"
      ,Code:"MSR"
    },
    {
       Country:" Oman "
      ,City:"Muscat"
      ,Code:"MCT"
    },
    {
       Country:" AL "
      ,City:"Muscle Shoals"
      ,Code:"MSL"
    },
    {
       Country:" MI "
      ,City:"Muskegon"
      ,Code:"MKG"
    },
    {
       Country:" ON "
      ,City:"Muskrat Dam"
      ,Code:"MSA"
    },
    {
       Country:" Tanzania "
      ,City:"Musoma"
      ,Code:"MUZ"
    },
    {
       Country:" Pakistan "
      ,City:"Muzaffarabad"
      ,Code:"MFG"
    },
    {
       Country:" Tanzania "
      ,City:"Mwanza"
      ,Code:"MWZ"
    },
    {
       Country:" Myanmar "
      ,City:"Myeik"
      ,Code:"MGZ"
    },
    {
       Country:" Myanmar "
      ,City:"Myitkyina"
      ,Code:"MYT"
    },
    {
       Country:" SC "
      ,City:"Myrtle Beach"
      ,Code:"MYR"
    },
    {
       Country:" Greece "
      ,City:"Mytilene"
      ,Code:"MJT"
    },
    {
       Country:" Malawi "
      ,City:"Mzuzu"
      ,Code:"ZZU"
    },
    {
       Country:" Indonesia "
      ,City:"Nabire"
      ,Code:"NBX"
    },
    {
       Country:" Mozambique "
      ,City:"Nacala"
      ,Code:"MNC"
    },
    {
       Country:" Morocco "
      ,City:"Nadar"
      ,Code:"NDR"
    },
    {
       Country:" Fiji "
      ,City:"Nadi"
      ,Code:"NAN"
    },
    {
       Country:" Russia "
      ,City:"Nadym"
      ,Code:"NYM"
    },
    {
       Country:" Philippines "
      ,City:"Naga"
      ,Code:"WNP"
    },
    {
       Country:" Japan "
      ,City:"Nagasaki"
      ,Code:"NGS"
    },
    {
       Country:" Japan - Chubu CentrAir Intl "
      ,City:"Nagoya"
      ,Code:"NGO"
    },
    {
       Country:" Japan - Nagoya Komaki APT "
      ,City:"Nagoya"
      ,Code:"NGO"
    },
    {
       Country:" India "
      ,City:"Nagpur"
      ,Code:"NAG"
    },
    {
       Country:" NL "
      ,City:"Nain"
      ,Code:"YDP"
    },
    {
       Country:" Kenya - Jomo Kenyatta Intl "
      ,City:"Nairobi"
      ,Code:"NBO"
    },
    {
       Country:" Kenya - Wilson "
      ,City:"Nairobi"
      ,Code:"WIL"
    },
    {
       Country:" Azerbaijan "
      ,City:"Nakhichevan"
      ,Code:"NAJ"
    },
    {
       Country:" Thailand "
      ,City:"Nakhon Ratchosima"
      ,Code:"NAK"
    },
    {
       Country:" Thailand "
      ,City:"Nakhon Si Thammarat"
      ,Code:"NST"
    },
    {
       Country:" ON "
      ,City:"Nakina"
      ,Code:"YQN"
    },
    {
       Country:" Russia "
      ,City:"Nalchik"
      ,Code:"NAL"
    },
    {
       Country:" Uzbekistan "
      ,City:"Namangan"
      ,Code:"NMA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Namatana"
      ,Code:"ATN"
    },
    {
       Country:" Marshall Islands "
      ,City:"Namorik Island"
      ,Code:"NDK"
    },
    {
       Country:" Mozambique "
      ,City:"Nampula"
      ,Code:"APL"
    },
    {
       Country:" Norway "
      ,City:"Namsos"
      ,Code:"OSY"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Namudi"
      ,Code:"NDI"
    },
    {
       Country:" Thailand "
      ,City:"Nan"
      ,Code:"NNT"
    },
    {
       Country:" BC - Cassidy Airport "
      ,City:"Nanaimo"
      ,Code:"YCD"
    },
    {
       Country:" BC - Harbour Airport "
      ,City:"Nanaimo"
      ,Code:"ZNA"
    },
    {
       Country:" China "
      ,City:"Nanchong"
      ,Code:"NAO"
    },
    {
       Country:" NU "
      ,City:"Nanisivik"
      ,Code:"YSR"
    },
    {
       Country:" China "
      ,City:"Nanking/Nanjing"
      ,Code:"NKG"
    },
    {
       Country:" China "
      ,City:"Nanning"
      ,Code:"NNG"
    },
    {
       Country:" Greenland "
      ,City:"Nanortalik"
      ,Code:"JNN"
    },
    {
       Country:" France - Nantes Atlantique "
      ,City:"Nantes"
      ,Code:"NTE"
    },
    {
       Country:" France - Rail service "
      ,City:"Nantes"
      ,Code:"QJZ"
    },
    {
       Country:" China "
      ,City:"Nantong"
      ,Code:"NTG"
    },
    {
       Country:" MA "
      ,City:"Nantucket"
      ,Code:"ACK"
    },
    {
       Country:" China "
      ,City:"Nanyang"
      ,Code:"NNY"
    },
    {
       Country:" Kenya "
      ,City:"Nanyuki"
      ,Code:"NYK"
    },
    {
       Country:" AK "
      ,City:"Napakiak"
      ,Code:"WNA"
    },
    {
       Country:" ON - Rail service "
      ,City:"Napanee"
      ,Code:"XIF"
    },
    {
       Country:" AK "
      ,City:"Napaskiak"
      ,Code:"PKA"
    },
    {
       Country:" New Zealand "
      ,City:"Napier-Hastings"
      ,Code:"NPE"
    },
    {
       Country:" FL "
      ,City:"Naples"
      ,Code:"APF"
    },
    {
       Country:" Italy "
      ,City:"Naples"
      ,Code:"NAP"
    },
    {
       Country:" Thailand "
      ,City:"Narathiwat"
      ,Code:"NAW"
    },
    {
       Country:" Australia "
      ,City:"Narrabri"
      ,Code:"NAA"
    },
    {
       Country:" Greenland "
      ,City:"Narsaq"
      ,Code:"JNS"
    },
    {
       Country:" Greenland "
      ,City:"Narsarsuaq"
      ,Code:"UAK"
    },
    {
       Country:" Norway "
      ,City:"Narvik"
      ,Code:"NVK"
    },
    {
       Country:" Russia "
      ,City:"Naryan-Mar"
      ,Code:"NNM"
    },
    {
       Country:" TN "
      ,City:"Nashville"
      ,Code:"BNA"
    },
    {
       Country:" Bahamas - Paradise Island "
      ,City:"Nassau"
      ,Code:"NAS"
    },
    {
       Country:" Congo "
      ,City:"Natadi"
      ,Code:"MAT"
    },
    {
       Country:" Brazil "
      ,City:"Natal"
      ,Code:"NAT"
    },
    {
       Country:" QC "
      ,City:"Natashquan"
      ,Code:"YNA"
    },
    {
       Country:" AK "
      ,City:"Naukiti"
      ,Code:"NKI"
    },
    {
       Country:" Nauru "
      ,City:"Nauru Island"
      ,Code:"INU"
    },
    {
       Country:" Brazil "
      ,City:"Navegantes"
      ,Code:"NVT"
    },
    {
       Country:" Pakistan "
      ,City:"Nawabshah"
      ,Code:"WNS"
    },
    {
       Country:" Russia "
      ,City:"NayUrengoy"
      ,Code:"NUX"
    },
    {
       Country:" Chad "
      ,City:"Ndjamena"
      ,Code:"NDJ"
    },
    {
       Country:" Zambia "
      ,City:"Ndola"
      ,Code:"NLA"
    },
    {
       Country:" Greenland "
      ,City:"Neerlerit Inaat"
      ,Code:"CNP"
    },
    {
       Country:" Russia "
      ,City:"Nefteyugansk"
      ,Code:"NFG"
    },
    {
       Country:" Ethiopia "
      ,City:"Neghelli"
      ,Code:"EGL"
    },
    {
       Country:" Jamaica "
      ,City:"Negril"
      ,Code:"NEG"
    },
    {
       Country:" Colombia "
      ,City:"Neiva"
      ,Code:"NVA"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Nejran"
      ,Code:"EAM"
    },
    {
       Country:" New Zealand "
      ,City:"Nelso"
      ,Code:"NSN"
    },
    {
       Country:" AK "
      ,City:"Nelson Lagoon"
      ,Code:"NLG"
    },
    {
       Country:" South Africa "
      ,City:"Nelspruit"
      ,Code:"NLP"
    },
    {
       Country:" Mauritania "
      ,City:"Nema"
      ,Code:"EMN"
    },
    {
       Country:" QC "
      ,City:"Nemiscau"
      ,Code:"YNS"
    },
    {
       Country:" Russia "
      ,City:"Neryjungri"
      ,Code:"NER"
    },
    {
       Country:" Argentina "
      ,City:"Neuquen"
      ,Code:"NQN"
    },
    {
       Country:" St. Kitts and Nevis "
      ,City:"Nevis"
      ,Code:"NEV"
    },
    {
       Country:" QC - Rail service "
      ,City:"New Carlisle"
      ,Code:"XEL"
    },
    {
       Country:" AK "
      ,City:"New Chenega"
      ,Code:"NCN"
    },
    {
       Country:" CT "
      ,City:"New Haven"
      ,Code:"HVN"
    },
    {
       Country:" AK "
      ,City:"New Koliganek"
      ,Code:"KGK"
    },
    {
       Country:""
      ,City:"New London/Groton "
      ,Code:"GON"
    },
    {
       Country:""
      ,City:"New London/Groton "
      ,Code:"GON"
    },
    {
       Country:" LA "
      ,City:"New Orleans"
      ,Code:"MSY"
    },
    {
       Country:" New Zealand "
      ,City:"New Plymouth"
      ,Code:"NPL"
    },
    {
       Country:" QC - Rail service "
      ,City:"New Richmond"
      ,Code:"XEM"
    },
    {
       Country:" AK "
      ,City:"New Stuyahok"
      ,Code:"KNW"
    },
    {
       Country:" NY - All airports "
      ,City:"New York"
      ,Code:"NYC"
    },
    {
       Country:" NY - Kennedy "
      ,City:"New York"
      ,Code:"JFK"
    },
    {
       Country:" NY - La Guardia "
      ,City:"New York"
      ,Code:"LGA"
    },
    {
       Country:" NJ "
      ,City:"Newark"
      ,Code:"EWR"
    },
    {
       Country:" NY "
      ,City:"Newburgh/Stewart Field"
      ,Code:"SWF"
    },
    {
       Country:" Australia "
      ,City:"Newcastle"
      ,Code:"NTL"
    },
    {
       Country:" Australia - Belmont "
      ,City:"Newcastle"
      ,Code:"BEO"
    },
    {
       Country:" United Kingdom "
      ,City:"Newcastle"
      ,Code:"NCL"
    },
    {
       Country:" Australia "
      ,City:"Newman"
      ,Code:"ZNE"
    },
    {
       Country:" VA "
      ,City:"Newport News"
      ,Code:"PHF"
    },
    {
       Country:" United Kingdom "
      ,City:"Newquay"
      ,Code:"NQY"
    },
    {
       Country:" AK "
      ,City:"Newtok"
      ,Code:"WWT"
    },
    {
       Country:" Cameroon "
      ,City:"Ngaoundere"
      ,Code:"NGE"
    },
    {
       Country:" Fiji "
      ,City:"Ngau Island"
      ,Code:"NGI"
    },
    {
       Country:" Australia "
      ,City:"Ngukurr"
      ,Code:"RPM"
    },
    {
       Country:" Viet Nam "
      ,City:"Nha Trang"
      ,Code:"NHA"
    },
    {
       Country:" ON - Rail service "
      ,City:"Niagara Falls"
      ,Code:"XLV"
    },
    {
       Country:" Niger "
      ,City:"Niamey"
      ,Code:"NIM"
    },
    {
       Country:" France "
      ,City:"Nice"
      ,Code:"NCE"
    },
    {
       Country:" Cyprus "
      ,City:"Nicosia"
      ,Code:"NIC"
    },
    {
       Country:" AK "
      ,City:"Nightmute"
      ,Code:"NME"
    },
    {
       Country:" AK "
      ,City:"Nikolai"
      ,Code:"NIB"
    },
    {
       Country:" AK "
      ,City:"Nikolski"
      ,Code:"IKO"
    },
    {
       Country:" France "
      ,City:"Nimes"
      ,Code:"FNI"
    },
    {
       Country:" China "
      ,City:"Ningbo"
      ,Code:"NGB"
    },
    {
       Country:" Congo "
      ,City:"Nioko"
      ,Code:"NIX"
    },
    {
       Country:" Tonga "
      ,City:"Niuafo'ou"
      ,Code:"NFO"
    },
    {
       Country:" Tonga "
      ,City:"Niuatoputapu"
      ,Code:"NTT"
    },
    {
       Country:" Niue "
      ,City:"Niue Island"
      ,Code:"IUE"
    },
    {
       Country:" Russia "
      ,City:"Nizhnevartovsk"
      ,Code:"NJC"
    },
    {
       Country:" Russia "
      ,City:"Nizhniy Novgorod"
      ,Code:"GOJ"
    },
    {
       Country:" AK "
      ,City:"Noatak"
      ,Code:"WTK"
    },
    {
       Country:" Russia "
      ,City:"Nojabrxsk"
      ,Code:"NOJ"
    },
    {
       Country:" AK "
      ,City:"Nome"
      ,Code:"OME"
    },
    {
       Country:" AK "
      ,City:"Nondalton"
      ,Code:"NNL"
    },
    {
       Country:" AK "
      ,City:"Noorvik"
      ,Code:"ORV"
    },
    {
       Country:" QC "
      ,City:"Noranda/Rouyn"
      ,Code:"YUY"
    },
    {
       Country:" Germany "
      ,City:"Norderney"
      ,Code:"NRD"
    },
    {
       Country:" Germany "
      ,City:"Nordholz-Speika"
      ,Code:"NDZ"
    },
    {
       Country:" Norfolk Island "
      ,City:"Norfolk Island"
      ,Code:"NLK"
    },
    {
       Country:" NE "
      ,City:"Norfolk"
      ,Code:"OFK"
    },
    {
       Country:" VA "
      ,City:"Norfolk"
      ,Code:"ORF"
    },
    {
       Country:" Russia "
      ,City:"Noril'sk"
      ,Code:"NSK"
    },
    {
       Country:" NT "
      ,City:"Norman Wells"
      ,Code:"YVQ"
    },
    {
       Country:" Australia"
      ,City:"Normanton"
      ,Code:"NTN"
    },
    {
       Country:" Sweden "
      ,City:"Norrkoping"
      ,Code:"NRK"
    },
    {
       Country:" Vanuatu "
      ,City:"Norsup"
      ,Code:"NUS"
    },
    {
       Country:" ON "
      ,City:"North Bay"
      ,Code:"YYB"
    },
    {
       Country:" OR "
      ,City:"North Bend"
      ,Code:"OTH"
    },
    {
       Country:" Turks and Caicos Islands "
      ,City:"North Caicos"
      ,Code:"NCA"
    },
    {
       Country:" Bahamas "
      ,City:"North Eleuthera"
      ,Code:"ELH"
    },
    {
       Country:" NE "
      ,City:"North Platte"
      ,Code:"LBF"
    },
    {
       Country:" United Kingdom "
      ,City:"North Ronaldsay"
      ,Code:"NRL"
    },
    {
       Country:" ON "
      ,City:"North Spirit Lake"
      ,Code:"YNO"
    },
    {
       Country:" AK "
      ,City:"Northway"
      ,Code:"ORT"
    },
    {
       Country:" MB "
      ,City:"Norway House"
      ,Code:"YNE"
    },
    {
       Country:" United Kingdom "
      ,City:"Norwich"
      ,Code:"NWI"
    },
    {
       Country:" Costa Rica "
      ,City:"Nosara Beach"
      ,Code:"NOB"
    },
    {
       Country:" Madagascar "
      ,City:"Nossi-be"
      ,Code:"NOS"
    },
    {
       Country:" United Kingdom "
      ,City:"Nottingham"
      ,Code:"EMA"
    },
    {
       Country:" Mauritania "
      ,City:"Nouadhiba"
      ,Code:"NDB"
    },
    {
       Country:" Mauritania "
      ,City:"Nouakchott"
      ,Code:"NKC"
    },
    {
       Country:" New Caledonia - Magenta "
      ,City:"Noumea"
      ,Code:"GEA"
    },
    {
       Country:" New Caledonia - Tontouta "
      ,City:"Noumea"
      ,Code:"NOU"
    },
    {
       Country:" Russia "
      ,City:"Novgorod"
      ,Code:"NVR"
    },
    {
       Country:" Russia "
      ,City:"Novokuznetsk"
      ,Code:"NOZ"
    },
    {
       Country:" Russia - Tolmachevo "
      ,City:"Novosibirsk"
      ,Code:"OVB"
    },
    {
       Country:" Cuba "
      ,City:"Nueva Gerona"
      ,Code:"GER"
    },
    {
       Country:" Mexico "
      ,City:"Nuevo Laredo"
      ,Code:"NLD"
    },
    {
       Country:" AK "
      ,City:"Nuiqsut"
      ,Code:"NUI"
    },
    {
       Country:" French Polynesia "
      ,City:"Nuku Hiva"
      ,Code:"NHV"
    },
    {
       Country:" Tonga "
      ,City:"Nuku'Alofa"
      ,Code:"TBU"
    },
    {
       Country:" Uzbekistan "
      ,City:"Nukus"
      ,Code:"NCU"
    },
    {
       Country:" AK "
      ,City:"Nulato"
      ,Code:"NUL"
    },
    {
       Country:" Australia "
      ,City:"Numbulwar"
      ,Code:"NUB"
    },
    {
       Country:" AK "
      ,City:"Nunapitchuk"
      ,Code:"NUP"
    },
    {
       Country:" Indonesia "
      ,City:"Nunukan"
      ,Code:"NNX"
    },
    {
       Country:" Germany "
      ,City:"Nuremberg"
      ,Code:"NUE"
    },
    {
       Country:" Germany - Rail service "
      ,City:"Nuremberg"
      ,Code:"ZAQ"
    },
    {
       Country:" Greenland "
      ,City:"Nuuk"
      ,Code:"GOH"
    },
    {
       Country:" Sudan "
      ,City:"Nyala"
      ,Code:"UYL"
    },
    {
       Country:" Myanmar "
      ,City:"Nyaung"
      ,Code:"NYU"
    },
    {
       Country:" Australia "
      ,City:"Nyngan"
      ,Code:"NYN"
    },
    {
       Country:" CA "
      ,City:"Oakland"
      ,Code:"OAK"
    },
    {
       Country:" Mexico "
      ,City:"Oaxaca"
      ,Code:"OAX"
    },
    {
       Country:" Indonesia "
      ,City:"Obano"
      ,Code:"OBD"
    },
    {
       Country:" Japan "
      ,City:"Obihiro"
      ,Code:"OBO"
    },
    {
       Country:" Jamaica "
      ,City:"Ocho Rios"
      ,Code:"OCJ"
    },
    {
       Country:" Denmark "
      ,City:"Odense"
      ,Code:"ZBQ"
    },
    {
       Country:" Ukraine "
      ,City:"Odessa"
      ,Code:"ODS"
    },
    {
       Country:" TX "
      ,City:"Odessa/Midland"
      ,Code:"MAF"
    },
    {
       Country:" NY "
      ,City:"Ogdensburg"
      ,Code:"OGS"
    },
    {
       Country:" ON "
      ,City:"Ogoki"
      ,Code:"YOG"
    },
    {
       Country:" Macedonia "
      ,City:"Ohrid"
      ,Code:"OHD"
    },
    {
       Country:" Japan "
      ,City:"Oita"
      ,Code:"OIT"
    },
    {
       Country:" Indonedia "
      ,City:"Okaba"
      ,Code:"OKQ"
    },
    {
       Country:" Japan "
      ,City:"Okayama"
      ,Code:"OKJ"
    },
    {
       Country:" Russia "
      ,City:"Okhotsk"
      ,Code:"OHO"
    },
    {
       Country:" Japan "
      ,City:"Okinawa"
      ,Code:"OKA"
    },
    {
       Country:" OK "
      ,City:"Oklahoma City"
      ,Code:"OKC"
    },
    {
       Country:" Japan "
      ,City:"Okoshiri"
      ,Code:"OIR"
    },
    {
       Country:" Indonesia "
      ,City:"Oksibil"
      ,Code:"OKL"
    },
    {
       Country:" Italy "
      ,City:"Olbia"
      ,Code:"OLB"
    },
    {
       Country:" YT "
      ,City:"Old Crow"
      ,Code:"YOC"
    },
    {
       Country:" Vanuatu "
      ,City:"Olpoi"
      ,Code:"OLJ"
    },
    {
       Country:" Australia "
      ,City:"Olympic Dam"
      ,Code:"OLP"
    },
    {
       Country:" NE "
      ,City:"Omaha"
      ,Code:"OMA"
    },
    {
       Country:" Gabon "
      ,City:"Omboue"
      ,Code:"OMB"
    },
    {
       Country:" Russia "
      ,City:"Omsk"
      ,Code:"OMS"
    },
    {
       Country:" Namibia "
      ,City:"Ondangwa"
      ,Code:"OND"
    },
    {
       Country:" CA "
      ,City:"Ontario"
      ,Code:"ONT"
    },
    {
       Country:" ON "
      ,City:"Opapamiska Lake"
      ,Code:"YBS"
    },
    {
       Country:" Romania "
      ,City:"Oradea"
      ,Code:"OMR"
    },
    {
       Country:" Algeria "
      ,City:"Oran"
      ,Code:"ORN"
    },
    {
       Country:" CA "
      ,City:"Orange County"
      ,Code:"SNA"
    },
    {
       Country:" Australia "
      ,City:"Orange"
      ,Code:"OAG"
    },
    {
       Country:" Namibia "
      ,City:"Oranjemund"
      ,Code:"OMD"
    },
    {
       Country:" Sweeden - Obrebro-Bofors "
      ,City:"Orebro"
      ,Code:"ORB"
    },
    {
       Country:" Russia "
      ,City:"Orenburg"
      ,Code:"REN"
    },
    {
       Country:" FL - Herndon "
      ,City:"Orlando"
      ,Code:"ORL"
    },
    {
       Country:" FL - International "
      ,City:"Orlando"
      ,Code:"MCO"
    },
    {
       Country:" Pakistan "
      ,City:"Ormara"
      ,Code:"ORW"
    },
    {
       Country:" Sweden "
      ,City:"Ornskoldsvik"
      ,Code:"OER"
    },
    {
       Country:" Russia "
      ,City:"Orsk"
      ,Code:"OSW"
    },
    {
       Country:" Norway "
      ,City:"Orsta-Volda"
      ,Code:"HOV"
    },
    {
       Country:" Japan - all airports "
      ,City:"Osaka"
      ,Code:"OSA"
    },
    {
       Country:" Japan - Itami "
      ,City:"Osaka"
      ,Code:"ITM"
    },
    {
       Country:" Japan - Kansai Intl "
      ,City:"Osaka"
      ,Code:"KIX"
    },
    {
       Country:" ON "
      ,City:"Oshawa"
      ,Code:"YOO"
    },
    {
       Country:" Japan "
      ,City:"Oshima"
      ,Code:"OIM"
    },
    {
       Country:" WI "
      ,City:"Oshkosh"
      ,Code:"OSH"
    },
    {
       Country:" Croatia "
      ,City:"Osijek"
      ,Code:"OSI"
    },
    {
       Country:" Sweden "
      ,City:"Oskarshamn"
      ,Code:"OSK"
    },
    {
       Country:" Norway "
      ,City:"Oslo"
      ,Code:"OSL"
    },
    {
       Country:" Sweden "
      ,City:"Ostersund"
      ,Code:"OSD"
    },
    {
       Country:" Czech Republic "
      ,City:"Ostrava"
      ,Code:"OSR"
    },
    {
       Country:" ON - International "
      ,City:"Ottawa"
      ,Code:"YOW"
    },
    {
       Country:" ON - Rail service "
      ,City:"Ottawa"
      ,Code:"XDS"
    },
    {
       Country:" IA "
      ,City:"Ottumwa"
      ,Code:"OTM"
    },
    {
       Country:" Colombia "
      ,City:"Otu"
      ,Code:"OTU"
    },
    {
       Country:" Burkina Faso "
      ,City:"Ouagadougou"
      ,Code:"OUA"
    },
    {
       Country:" Algeria "
      ,City:"Ouargla"
      ,Code:"OGX"
    },
    {
       Country:" Morocco "
      ,City:"Ouarzazate"
      ,Code:"OZZ"
    },
    {
       Country:" Laos "
      ,City:"Oudomxay"
      ,Code:"ODY"
    },
    {
       Country:" Morocco "
      ,City:"Oujda"
      ,Code:"OUD"
    },
    {
       Country:" Finland "
      ,City:"Oulu"
      ,Code:"OUL"
    },
    {
       Country:" New Caledonia "
      ,City:"Ouvea"
      ,Code:"UVE"
    },
    {
       Country:" Israel "
      ,City:"Ovda"
      ,Code:"VDA"
    },
    {
       Country:" KY "
      ,City:"Owensboro"
      ,Code:"OWB"
    },
    {
       Country:" MB "
      ,City:"Oxford House"
      ,Code:"YOH"
    },
    {
       Country:" CA "
      ,City:"Oxnard/Ventura"
      ,Code:"OXR"
    },
    {
       Country:" Gabon "
      ,City:"Oyem"
      ,Code:"OYE"
    },
    {
       Country:" Vanuatu "
      ,City:"Paama"
      ,Code:"PBJ"
    },
    {
       Country:" Greenland "
      ,City:"Paamiut"
      ,Code:"JFR"
    },
    {
       Country:" Indonesia "
      ,City:"Padang"
      ,Code:"PDG"
    },
    {
       Country:" Germany "
      ,City:"Paderborn"
      ,Code:"PAD"
    },
    {
       Country:" KY "
      ,City:"Paducah"
      ,Code:"PAH"
    },
    {
       Country:" AZ "
      ,City:"Page"
      ,Code:"PGA"
    },
    {
       Country:" American Samoa "
      ,City:"Pago Pago"
      ,Code:"PPG"
    },
    {
       Country:" Laos "
      ,City:"Pakse"
      ,Code:"PKZ"
    },
    {
       Country:" QC "
      ,City:"Pakuashipi"
      ,Code:"YIF"
    },
    {
       Country:" Uganda "
      ,City:"Pakuba"
      ,Code:"PAF"
    },
    {
       Country:" Honduras "
      ,City:"Palacios"
      ,Code:"PCH"
    },
    {
       Country:" Indonesia "
      ,City:"Palang Karaya"
      ,Code:"PKY"
    },
    {
       Country:" Lithuania "
      ,City:"Palanga"
      ,Code:"PLQ"
    },
    {
       Country:" Indonesia "
      ,City:"Palembang"
      ,Code:"PLM"
    },
    {
       Country:" Mexico "
      ,City:"Palenque"
      ,Code:"PQM"
    },
    {
       Country:" Italy "
      ,City:"Palermo"
      ,Code:"PMO"
    },
    {
       Country:" CA "
      ,City:"Palm Springs"
      ,Code:"PSP"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Palma Mallorca"
      ,Code:"PMI"
    },
    {
       Country:" Costa Rica "
      ,City:"Palmar"
      ,Code:"PMZ"
    },
    {
       Country:" Brazil "
      ,City:"Palmas"
      ,Code:"PMW"
    },
    {
       Country:" New Zealand "
      ,City:"Palmerston North"
      ,Code:"PMR"
    },
    {
       Country:" Indonesia "
      ,City:"Palu"
      ,Code:"PLW"
    },
    {
       Country:" Spain "
      ,City:"Pamplona"
      ,Code:"PNA"
    },
    {
       Country:" FL "
      ,City:"Panama City"
      ,Code:"PFN"
    },
    {
       Country:" Panama - Paitilla "
      ,City:"Panama City"
      ,Code:"PAC"
    },
    {
       Country:" Panama - Tocumen Intl "
      ,City:"Panama City"
      ,Code:"PTY"
    },
    {
       Country:" Indonesia "
      ,City:"Pangkalanboun"
      ,Code:"PKN"
    },
    {
       Country:" Indonesia "
      ,City:"Pangkalpinang"
      ,Code:"PGK"
    },
    {
       Country:" NU "
      ,City:"Pangnirtung"
      ,Code:"YXP"
    },
    {
       Country:" Pakistan "
      ,City:"Panjger"
      ,Code:"PJG"
    },
    {
       Country:" Italy "
      ,City:"Pantelleria"
      ,Code:"PNL"
    },
    {
       Country:" United Kingdom "
      ,City:"Papa Westray"
      ,Code:"PPW"
    },
    {
       Country:" French Polynesia "
      ,City:"Papeete"
      ,Code:"PPT"
    },
    {
       Country:" Cyprus "
      ,City:"Paphos"
      ,Code:"PFO"
    },
    {
       Country:" Pakistan "
      ,City:"Para Chinar"
      ,Code:"PAJ"
    },
    {
       Country:" Australia "
      ,City:"Paraburdoo"
      ,Code:"PBO"
    },
    {
       Country:" Bahamas "
      ,City:"Paradise Island"
      ,Code:"PID"
    },
    {
       Country:" Suriname - Zanderij Intl "
      ,City:"Paramaribo"
      ,Code:"PBM"
    },
    {
       Country:" Suriname - Zorg En Hoop "
      ,City:"Paramaribo"
      ,Code:"ORG"
    },
    {
       Country:" Argentina "
      ,City:"Parana"
      ,Code:"PRA"
    },
    {
       Country:" Solomon Islands "
      ,City:"Parasi"
      ,Code:"PRS"
    },
    {
       Country:" QC - Rail service "
      ,City:"Parent"
      ,Code:"XFE"
    },
    {
       Country:" France - All airports "
      ,City:"Paris"
      ,Code:"PAR"
    },
    {
       Country:" France - Beauvais-Tille "
      ,City:"Paris"
      ,Code:"BVA"
    },
    {
       Country:" France - Charles Degaulle "
      ,City:"Paris"
      ,Code:"CDG"
    },
    {
       Country:" France - Orly "
      ,City:"Paris"
      ,Code:"ORY"
    },
    {
       Country:" WV/Marietta"
      ,City:"Parkersburg"
      ,Code:"PKB"
    },
    {
       Country:" BC - Rail service "
      ,City:"Parksville"
      ,Code:"XPB"
    },
    {
       Country:" Italy "
      ,City:"Parma/Milan"
      ,Code:"PMF"
    },
    {
       Country:" Brazil "
      ,City:"Parnaiba"
      ,Code:"PHB"
    },
    {
       Country:" Bhutan "
      ,City:"Paro"
      ,Code:"PBH"
    },
    {
       Country:" WA "
      ,City:"Pasco"
      ,Code:"PSC"
    },
    {
       Country:" Pakistan "
      ,City:"Pasni"
      ,Code:"PSI"
    },
    {
       Country:" Argentina "
      ,City:"Paso de Los Libres"
      ,Code:"AOL"
    },
    {
       Country:" Brazil "
      ,City:"Passo Fundo"
      ,Code:"PFB"
    },
    {
       Country:" Colombia "
      ,City:"Pasto"
      ,Code:"PSO"
    },
    {
       Country:" India "
      ,City:"Patna"
      ,Code:"PAT"
    },
    {
       Country:" Greece "
      ,City:"Patras"
      ,Code:"GPA"
    },
    {
       Country:" France "
      ,City:"Pau"
      ,Code:"PUF"
    },
    {
       Country:" NT "
      ,City:"Paulatuk"
      ,Code:"YPC"
    },
    {
       Country:" Kazakhstan "
      ,City:"Pavlodar"
      ,Code:"PWQ"
    },
    {
       Country:" AB "
      ,City:"Peace River"
      ,Code:"YPE"
    },
    {
       Country:" ON "
      ,City:"Peawanuck"
      ,Code:"YPO"
    },
    {
       Country:" Russia "
      ,City:"Pechora"
      ,Code:"PEX"
    },
    {
       Country:" AK "
      ,City:"Pedro Bay"
      ,Code:"PDB"
    },
    {
       Country:" Indonesia "
      ,City:"Pekanbaru"
      ,Code:"PKU"
    },
    {
       Country:" AK "
      ,City:"Pelican"
      ,Code:"PEC"
    },
    {
       Country:" MI "
      ,City:"Pellston"
      ,Code:"PLN"
    },
    {
       Country:" Brazil "
      ,City:"Pelotas"
      ,Code:"PET"
    },
    {
       Country:" Mozambique "
      ,City:"Pemba"
      ,Code:"POL"
    },
    {
       Country:" Tanzania - Wawi "
      ,City:"Pemba"
      ,Code:"PMA"
    },
    {
       Country:" ON "
      ,City:"Pembroke"
      ,Code:"YTA"
    },
    {
       Country:" Malaysia "
      ,City:"Penang"
      ,Code:"PEN"
    },
    {
       Country:" OR "
      ,City:"Pendleton"
      ,Code:"PDT"
    },
    {
       Country:" Cook Islands "
      ,City:"Penrhyn Island"
      ,Code:"PYE"
    },
    {
       Country:" FL "
      ,City:"Pensacola"
      ,Code:"PNS"
    },
    {
       Country:" BC "
      ,City:"Penticton"
      ,Code:"YYF"
    },
    {
       Country:" United Kingdom "
      ,City:"Penzance"
      ,Code:"PZE"
    },
    {
       Country:" IL "
      ,City:"Peoria"
      ,Code:"PIA"
    },
    {
       Country:" QC - Rail service "
      ,City:"Perce"
      ,Code:"XFG"
    },
    {
       Country:" Colombia "
      ,City:"Pereira"
      ,Code:"PEI"
    },
    {
       Country:" France "
      ,City:"Perigueux"
      ,Code:"PGX"
    },
    {
       Country:" Argentina "
      ,City:"Perito Moreno"
      ,Code:"PMQ"
    },
    {
       Country:" Russia "
      ,City:"Perm"
      ,Code:"PEE"
    },
    {
       Country:" France "
      ,City:"Perpignan"
      ,Code:"PGF"
    },
    {
       Country:" AK "
      ,City:"Perryville"
      ,Code:"KPV"
    },
    {
       Country:" Western Australia"
      ,City:"Perth"
      ,Code:"PER"
    },
    {
       Country:" Italy "
      ,City:"Perugia"
      ,Code:"PEG"
    },
    {
       Country:" Italy "
      ,City:"Pescara"
      ,Code:"PSR"
    },
    {
       Country:" Pakistan "
      ,City:"Peshawar"
      ,Code:"PEW"
    },
    {
       Country:" AK "
      ,City:"Petersburg"
      ,Code:"PSG"
    },
    {
       Country:" Brazil "
      ,City:"Petrolina"
      ,Code:"PNZ"
    },
    {
       Country:" Russia "
      ,City:"Petropaulousk-Kamchats"
      ,Code:"PKC"
    },
    {
       Country:" Russia "
      ,City:"Petrozavodsk"
      ,Code:"PES"
    },
    {
       Country:" South Africa "
      ,City:"Phalaborwa"
      ,Code:"PHW"
    },
    {
       Country:" PA - International "
      ,City:"Philadelphia"
      ,Code:"PHL"
    },
    {
       Country:" PA - Trenton/Mercer NJ "
      ,City:"Philadelphia"
      ,Code:"TTN"
    },
    {
       Country:" Thailand "
      ,City:"Phitsanulok"
      ,Code:"PHS"
    },
    {
       Country:" Cambodia "
      ,City:"Phnom Penh"
      ,Code:"PNH"
    },
    {
       Country:" AZ "
      ,City:"Phoenix"
      ,Code:"PHX"
    },
    {
       Country:" Thailand "
      ,City:"Phrae"
      ,Code:"PRH"
    },
    {
       Country:" Viet Nam - Duong Dang "
      ,City:"Phu Quoc"
      ,Code:"PQC"
    },
    {
       Country:" Thailand "
      ,City:"Phuket"
      ,Code:"HKT"
    },
    {
       Country:" ON "
      ,City:"Pickle Lake"
      ,Code:"YPL"
    },
    {
       Country:" Portugal "
      ,City:"Pico Island"
      ,Code:"PIX"
    },
    {
       Country:" Mexico "
      ,City:"Piedras Negras"
      ,Code:"PDS"
    },
    {
       Country:" SD "
      ,City:"Pierre"
      ,Code:"PIR"
    },
    {
       Country:" South Africa "
      ,City:"Pietermaritzburg"
      ,Code:"PZB"
    },
    {
       Country:" South Africa "
      ,City:"Pietersburb"
      ,Code:"PTG"
    },
    {
       Country:" ON "
      ,City:"Pikangikum"
      ,Code:"YPM"
    },
    {
       Country:" AK "
      ,City:"Pilot Point"
      ,Code:"PIP"
    },
    {
       Country:" AK - Ugashnik Bay "
      ,City:"Pilot Point"
      ,Code:"UGB"
    },
    {
       Country:" AK "
      ,City:"Pilot Station"
      ,Code:"PQS"
    },
    {
       Country:" Taiwan "
      ,City:"Pingtung"
      ,Code:"PIF"
    },
    {
       Country:" Italy - Gal Galilei "
      ,City:"Pisa"
      ,Code:"PSA"
    },
    {
       Country:" PA "
      ,City:"Pittsburgh"
      ,Code:"PIT"
    },
    {
       Country:" Greenland "
      ,City:"Pituffik"
      ,Code:"THU"
    },
    {
       Country:" Peru "
      ,City:"Piura"
      ,Code:"PIU"
    },
    {
       Country:" Belize "
      ,City:"Placencia"
      ,Code:"PLJ"
    },
    {
       Country:" AK "
      ,City:"Platinum"
      ,Code:"PTU"
    },
    {
       Country:" NY "
      ,City:"Plattsburgh"
      ,Code:"PLB"
    },
    {
       Country:" Viet Nam "
      ,City:"Pleiku"
      ,Code:"PXU"
    },
    {
       Country:" South Africa "
      ,City:"Plettenburg Bay"
      ,Code:"PBZ"
    },
    {
       Country:" United Kingdom "
      ,City:"Plymouth"
      ,Code:"PLH"
    },
    {
       Country:" ID "
      ,City:"Pocatello"
      ,Code:"PIH"
    },
    {
       Country:" Serbia and Montenegro - Golubovci "
      ,City:"Podgoriea"
      ,Code:"TGD"
    },
    {
       Country:" Micronesia "
      ,City:"Pohnpei"
      ,Code:"PNI"
    },
    {
       Country:" AK "
      ,City:"Point Baker"
      ,Code:"KPB"
    },
    {
       Country:" AK "
      ,City:"Point Hope"
      ,Code:"PHO"
    },
    {
       Country:" AK "
      ,City:"Point Lay"
      ,Code:"PIZ"
    },
    {
       Country:" Congo "
      ,City:"Pointe Noire"
      ,Code:"PNR"
    },
    {
       Country:" Guadeloupe "
      ,City:"Pointe-a-Pitre"
      ,Code:"PTP"
    },
    {
       Country:" QC - Rail service "
      ,City:"Pointe-aux-Trembles"
      ,Code:"XPX"
    },
    {
       Country:" SK "
      ,City:"Points North Landing"
      ,Code:"YNL"
    },
    {
       Country:" France - Biard "
      ,City:"Poitiers"
      ,Code:"PIS"
    },
    {
       Country:" France - Rail service "
      ,City:"Poitiers"
      ,Code:"XOP"
    },
    {
       Country:" Nepal "
      ,City:"Pokhara"
      ,Code:"PKR"
    },
    {
       Country:" Ukraine "
      ,City:"Poltava"
      ,Code:"PLV"
    },
    {
       Country:" Russia "
      ,City:"Polyarnyj"
      ,Code:"PYJ"
    },
    {
       Country:" OK "
      ,City:"Ponca City"
      ,Code:"PNC"
    },
    {
       Country:" Puerto Rico "
      ,City:"Ponce"
      ,Code:"PSE"
    },
    {
       Country:" Puerto Rico "
      ,City:"Ponce"
      ,Code:"PSE"
    },
    {
       Country:" NU "
      ,City:"Pond Inlet"
      ,Code:"YIO"
    },
    {
       Country:" Portugal "
      ,City:"Ponta Delgada"
      ,Code:"PDL"
    },
    {
       Country:" Brazil "
      ,City:"Ponta Pora"
      ,Code:"PMG"
    },
    {
       Country:" Indonesia "
      ,City:"Pontianak"
      ,Code:"PNK"
    },
    {
       Country:" ON "
      ,City:"Poplar Hill"
      ,Code:"YHP"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Popondetta"
      ,Code:"PNP"
    },
    {
       Country:" Slovakia "
      ,City:"Popraol/Tatry"
      ,Code:"TAT"
    },
    {
       Country:" India "
      ,City:"Porbandar"
      ,Code:"PBD"
    },
    {
       Country:" Finland "
      ,City:"Pori"
      ,Code:"POR"
    },
    {
       Country:" Venezuela "
      ,City:"Porlamar"
      ,Code:"PMV"
    },
    {
       Country:" BC "
      ,City:"Port Alberni"
      ,Code:"YPB"
    },
    {
       Country:" AK "
      ,City:"Port Alsworth"
      ,Code:"PTA"
    },
    {
       Country:" WA "
      ,City:"Port Angeles"
      ,Code:"CLM"
    },
    {
       Country:" Jamaica "
      ,City:"Port Antonio"
      ,Code:"POT"
    },
    {
       Country:" TX "
      ,City:"Port Arthur/Beaumont"
      ,Code:"BPT"
    },
    {
       Country:" Haiti "
      ,City:"Port Au Prince"
      ,Code:"PAP"
    },
    {
       Country:" Australia "
      ,City:"Port Augusta"
      ,Code:"PUG"
    },
    {
       Country:" Madagascar "
      ,City:"Port Berge"
      ,Code:"WPB"
    },
    {
       Country:" India "
      ,City:"Port Blair"
      ,Code:"IXZ"
    },
    {
       Country:" AK "
      ,City:"Port Clarence"
      ,Code:"KPC"
    },
    {
       Country:" South Africa "
      ,City:"Port Elizabeth"
      ,Code:"PLZ"
    },
    {
       Country:" Gabon "
      ,City:"Port Gentil"
      ,Code:"POG"
    },
    {
       Country:" Nigeria "
      ,City:"Port Harcourt"
      ,Code:"PHC"
    },
    {
       Country:" BC "
      ,City:"Port Hardy"
      ,Code:"YZT"
    },
    {
       Country:" Australia "
      ,City:"Port Headland"
      ,Code:"PHE"
    },
    {
       Country:" AK "
      ,City:"Port Heiden"
      ,Code:"PTH"
    },
    {
       Country:" NL "
      ,City:"Port Hope Simpson"
      ,Code:"YHA"
    },
    {
       Country:" Australia "
      ,City:"Port Lincoln"
      ,Code:"PLO"
    },
    {
       Country:" Australia "
      ,City:"Port Macquarie"
      ,Code:"PQQ"
    },
    {
       Country:" QC "
      ,City:"Port Meiner"
      ,Code:"YPN"
    },
    {
       Country:" AK "
      ,City:"Port Moller"
      ,Code:"PML"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Port Moresby"
      ,Code:"POM"
    },
    {
       Country:" Trinidad "
      ,City:"Port of Spain"
      ,Code:"POS"
    },
    {
       Country:" AK "
      ,City:"Port Protection"
      ,Code:"PPV"
    },
    {
       Country:" Falkland Islands "
      ,City:"Port Stanley"
      ,Code:"PSY"
    },
    {
       Country:" Sudan "
      ,City:"Port Sudan"
      ,Code:"PZU"
    },
    {
       Country:" Vanuatu "
      ,City:"Port Vila"
      ,Code:"VLI"
    },
    {
       Country:" AK "
      ,City:"Portage Creek"
      ,Code:"PCA"
    },
    {
       Country:" ME "
      ,City:"Portland"
      ,Code:"PWM"
    },
    {
       Country:" OR "
      ,City:"Portland"
      ,Code:"PDX"
    },
    {
       Country:" Australia "
      ,City:"Portland"
      ,Code:"PTJ"
    },
    {
       Country:" Brazil "
      ,City:"Porto Alegre"
      ,Code:"POA"
    },
    {
       Country:" Portugal "
      ,City:"Porto Santo"
      ,Code:"PXO"
    },
    {
       Country:" Brazil "
      ,City:"Porto Seguro"
      ,Code:"BPS"
    },
    {
       Country:" Brazil "
      ,City:"Porto Velho"
      ,Code:"PVH"
    },
    {
       Country:" Portugal "
      ,City:"Porto"
      ,Code:"OPO"
    },
    {
       Country:" Ecuador "
      ,City:"Portoviejo"
      ,Code:"PVO"
    },
    {
       Country:" NH "
      ,City:"Portsmouth"
      ,Code:"PSM"
    },
    {
       Country:" Argentina "
      ,City:"Posadas"
      ,Code:"PSS"
    },
    {
       Country:" NL "
      ,City:"Postville"
      ,Code:"YSO"
    },
    {
       Country:" NY "
      ,City:"Poughkeepsie"
      ,Code:"POU"
    },
    {
       Country:" QC "
      ,City:"Povungnituk"
      ,Code:"YPX"
    },
    {
       Country:" BC "
      ,City:"Powell River"
      ,Code:"YPW"
    },
    {
       Country:" Mexico "
      ,City:"Poza Rico"
      ,Code:"PAZ"
    },
    {
       Country:" Poland "
      ,City:"Poznan"
      ,Code:"POZ"
    },
    {
       Country:" Czech Republic "
      ,City:"Prague"
      ,Code:"PRG"
    },
    {
       Country:" Cape Verde "
      ,City:"Praia"
      ,Code:"RAI"
    },
    {
       Country:" Argentina "
      ,City:"Pres. Roque Saenz Pena"
      ,Code:"PRQ"
    },
    {
       Country:" AZ "
      ,City:"Prescott"
      ,Code:"PRC"
    },
    {
       Country:" ON - Rail service "
      ,City:"Prescott"
      ,Code:"XII"
    },
    {
       Country:" Brazil "
      ,City:"Presidente Prudente"
      ,Code:"PPB"
    },
    {
       Country:" ME "
      ,City:"Presque Isle"
      ,Code:"PQI"
    },
    {
       Country:" Greece "
      ,City:"Preveza/Lefkas"
      ,Code:"PVK"
    },
    {
       Country:" SK "
      ,City:"Prince Albert"
      ,Code:"YPA"
    },
    {
       Country:" BC "
      ,City:"Prince George"
      ,Code:"YXS"
    },
    {
       Country:" BC - Rail service "
      ,City:"Prince George"
      ,Code:"XDV"
    },
    {
       Country:" BC - Digby Island Airport "
      ,City:"Prince Rupert"
      ,Code:"YPR"
    },
    {
       Country:" BC - Rail service "
      ,City:"Prince Rupert"
      ,Code:"XDW"
    },
    {
       Country:" WV "
      ,City:"Princeton"
      ,Code:"BLF"
    },
    {
       Country:" Serbia and Montenegro "
      ,City:"Pristina"
      ,Code:"PRN"
    },
    {
       Country:" Australia"
      ,City:"Proserpine"
      ,Code:"PPP"
    },
    {
       Country:" RI "
      ,City:"Providence"
      ,Code:"PVD"
    },
    {
       Country:" Turks and Caicos Islands "
      ,City:"Providenciales"
      ,Code:"PLS"
    },
    {
       Country:" MA "
      ,City:"Provincetown"
      ,Code:"PVC"
    },
    {
       Country:" AK "
      ,City:"Prudhoe Bay/Deadhorse"
      ,Code:"SCC"
    },
    {
       Country:" Peru "
      ,City:"Pucallpa"
      ,Code:"PCL"
    },
    {
       Country:" Mexico "
      ,City:"Puebla"
      ,Code:"PBC"
    },
    {
       Country:" CO "
      ,City:"Pueblo"
      ,Code:"PUB"
    },
    {
       Country:" Venezuela "
      ,City:"Puerto Ayacucha"
      ,Code:"PYH"
    },
    {
       Country:" Colombia "
      ,City:"Puerto Berria"
      ,Code:"PBE"
    },
    {
       Country:" Spain "
      ,City:"Puerto del Rosario"
      ,Code:"FUE"
    },
    {
       Country:" Argentina "
      ,City:"Puerto Deseado"
      ,Code:"PUD"
    },
    {
       Country:" Mexico "
      ,City:"Puerto Escondido"
      ,Code:"PXM"
    },
    {
       Country:" Costa Rica "
      ,City:"Puerto Jimenez"
      ,Code:"PJM"
    },
    {
       Country:" Honduras "
      ,City:"Puerto Lempira"
      ,Code:"PEU"
    },
    {
       Country:" Argentina "
      ,City:"Puerto Madryn"
      ,Code:"PMY"
    },
    {
       Country:" Peru "
      ,City:"Puerto Maldonado"
      ,Code:"PEM"
    },
    {
       Country:" Chile "
      ,City:"Puerto Montt"
      ,Code:"PMC"
    },
    {
       Country:" Venezuela "
      ,City:"Puerto Ordaz"
      ,Code:"PZO"
    },
    {
       Country:" Dominican Republic "
      ,City:"Puerto Plata"
      ,Code:"POP"
    },
    {
       Country:" Philippines "
      ,City:"Puerto Princesa"
      ,Code:"PPS"
    },
    {
       Country:" Bolivia "
      ,City:"Puerto Suarez"
      ,Code:"PSZ"
    },
    {
       Country:" Mexico "
      ,City:"Puerto Vallarta"
      ,Code:"PVR"
    },
    {
       Country:" MB - "
      ,City:"Pukatawagan"
      ,Code:"XPK"
    },
    {
       Country:" Croatia "
      ,City:"Pula"
      ,Code:"PUY"
    },
    {
       Country:" WA "
      ,City:"Pullman"
      ,Code:"PUW"
    },
    {
       Country:" India "
      ,City:"Pune"
      ,Code:"PNQ"
    },
    {
       Country:" Chile "
      ,City:"Punta Arenas"
      ,Code:"PUQ"
    },
    {
       Country:" Dominican Republic "
      ,City:"Punta Cana"
      ,Code:"PUJ"
    },
    {
       Country:" Uruguay "
      ,City:"Punta Del Este"
      ,Code:"PDP"
    },
    {
       Country:" Belize "
      ,City:"Punta Gorda"
      ,Code:"PND"
    },
    {
       Country:" Costa Rica "
      ,City:"Punta Islita"
      ,Code:"PBP"
    },
    {
       Country:" India "
      ,City:"Puttaparthi"
      ,Code:"PUT"
    },
    {
       Country:" Indonesia "
      ,City:"Putussibau"
      ,Code:"PSU"
    },
    {
       Country:" North Korea "
      ,City:"Pyongyang"
      ,Code:"FNJ"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Qaisumah"
      ,Code:"AQI"
    },
    {
       Country:" Greenland "
      ,City:"Qaqortoq"
      ,Code:"JJU"
    },
    {
       Country:" China "
      ,City:"Qiemo"
      ,Code:"IQM"
    },
    {
       Country:" NU "
      ,City:"Qikiqtarjuaq"
      ,Code:"YVM"
    },
    {
       Country:" China "
      ,City:"Qingdao"
      ,Code:"TAO"
    },
    {
       Country:" China "
      ,City:"Qiqihar"
      ,Code:"NDG"
    },
    {
       Country:" BC "
      ,City:"Qualicum"
      ,Code:"XQU"
    },
    {
       Country:" QC "
      ,City:"Quaqtaq"
      ,Code:"YQC"
    },
    {
       Country:" QC - Charny Rail service "
      ,City:"Quebec"
      ,Code:"YFZ"
    },
    {
       Country:" QC - International Airport "
      ,City:"Quebec"
      ,Code:"YQB"
    },
    {
       Country:" QC - Levis Rail service "
      ,City:"Quebec"
      ,Code:"XLK"
    },
    {
       Country:" QC - Quebec Station Rail service "
      ,City:"Quebec"
      ,Code:"XLJ"
    },
    {
       Country:" QC - Sainte-Foy Rail service "
      ,City:"Quebec"
      ,Code:"XFY"
    },
    {
       Country:" New Zealand "
      ,City:"Queenstown"
      ,Code:"ZQN"
    },
    {
       Country:" Mozambique "
      ,City:"Quelimane"
      ,Code:"UEL"
    },
    {
       Country:" Costa Rica "
      ,City:"Quepos"
      ,Code:"XQP"
    },
    {
       Country:" Mexico "
      ,City:"Queretaro"
      ,Code:"QRO"
    },
    {
       Country:" BC "
      ,City:"Quesnel"
      ,Code:"YQZ"
    },
    {
       Country:" Pakistan "
      ,City:"Quetta"
      ,Code:"UET"
    },
    {
       Country:" Viet Nam "
      ,City:"Qui Nhon"
      ,Code:"UIH"
    },
    {
       Country:" Colombia "
      ,City:"Quibdo"
      ,Code:"UIB"
    },
    {
       Country:" France "
      ,City:"Quimper"
      ,Code:"UIP"
    },
    {
       Country:" IL "
      ,City:"Quincy"
      ,Code:"UIN"
    },
    {
       Country:" AK "
      ,City:"Quinhagak"
      ,Code:"KWN"
    },
    {
       Country:" Australia"
      ,City:"Quipi"
      ,Code:"ULP"
    },
    {
       Country:" Ecuador "
      ,City:"Quito"
      ,Code:"UIO"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Rabaraba"
      ,Code:"RBP"
    },
    {
       Country:" Morocco "
      ,City:"Rabat"
      ,Code:"RBA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Rabaul"
      ,Code:"RAB"
    },
    {
       Country:" Viet Nam "
      ,City:"Rach Gia"
      ,Code:"VKG"
    },
    {
       Country:" Russia "
      ,City:"Raduzhnyi"
      ,Code:"RAT"
    },
    {
       Country:" NT "
      ,City:"Rae Lakes"
      ,Code:"YRA"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Rafha"
      ,Code:"RAH"
    },
    {
       Country:" Iran "
      ,City:"Rafsanjan"
      ,Code:"RJN"
    },
    {
       Country:" French Polynesia "
      ,City:"Raiatea"
      ,Code:"RFP"
    },
    {
       Country:" AB "
      ,City:"Rainbow Lake"
      ,Code:"YOP"
    },
    {
       Country:" India "
      ,City:"Rajkot"
      ,Code:"RAJ"
    },
    {
       Country:" Bangladesh "
      ,City:"Rajshahi"
      ,Code:"RJH"
    },
    {
       Country:" NC "
      ,City:"Raleigh/Durham"
      ,Code:"RDU"
    },
    {
       Country:" Solomon Islands "
      ,City:"Ramato"
      ,Code:"RBV"
    },
    {
       Country:" Australia "
      ,City:"Ramingining"
      ,Code:"RAM"
    },
    {
       Country:" AK "
      ,City:"Rampart"
      ,Code:"RMP"
    },
    {
       Country:" India "
      ,City:"Ranchi"
      ,Code:"IXR"
    },
    {
       Country:" NU "
      ,City:"Rankin Inlet"
      ,Code:"YRT"
    },
    {
       Country:" Thailand "
      ,City:"Ranong"
      ,Code:"UNN"
    },
    {
       Country:" SD "
      ,City:"Rapid City"
      ,Code:"RAP"
    },
    {
       Country:" Cook Islands "
      ,City:"Rarotonga"
      ,Code:"RAR"
    },
    {
       Country:" United Arab Emirates "
      ,City:"Ras Al Khaimah"
      ,Code:"RKT"
    },
    {
       Country:" Iran "
      ,City:"Rasht"
      ,Code:"RAS"
    },
    {
       Country:" Cambodia "
      ,City:"Ratanakiri"
      ,Code:"RBE"
    },
    {
       Country:" Pakistan "
      ,City:"Rawala Kot"
      ,Code:"RAZ"
    },
    {
       Country:" PA "
      ,City:"Reading"
      ,Code:"RDG"
    },
    {
       Country:" Japan "
      ,City:"Rebun"
      ,Code:"RBJ"
    },
    {
       Country:" Brazil "
      ,City:"Recife"
      ,Code:"REC"
    },
    {
       Country:" Argentina "
      ,City:"Reconquista"
      ,Code:"RCQ"
    },
    {
       Country:" AK "
      ,City:"Red Devil"
      ,Code:"RDV"
    },
    {
       Country:" ON "
      ,City:"Red Lake"
      ,Code:"YRL"
    },
    {
       Country:" MB "
      ,City:"Red Sucker Lake"
      ,Code:"YRS"
    },
    {
       Country:" CA "
      ,City:"Redding"
      ,Code:"RDD"
    },
    {
       Country:" OR "
      ,City:"Redmond"
      ,Code:"RDM"
    },
    {
       Country:" Italy "
      ,City:"Reggio Calabria"
      ,Code:"REG"
    },
    {
       Country:" SK "
      ,City:"Regina"
      ,Code:"YQR"
    },
    {
       Country:" Solomon Islands "
      ,City:"Rennell"
      ,Code:"RNL"
    },
    {
       Country:" France "
      ,City:"Rennes"
      ,Code:"RNS"
    },
    {
       Country:" NV "
      ,City:"Reno"
      ,Code:"RNO"
    },
    {
       Country:" NU "
      ,City:"Repulse Bay"
      ,Code:"YUT"
    },
    {
       Country:" Argentina "
      ,City:"Resistencia"
      ,Code:"RES"
    },
    {
       Country:" NU "
      ,City:"Resolute"
      ,Code:"YRB"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Reus"
      ,Code:"REU"
    },
    {
       Country:" Iceland "
      ,City:"Reykjavik"
      ,Code:"KEF"
    },
    {
       Country:" Mexico "
      ,City:"Reynossa"
      ,Code:"REX"
    },
    {
       Country:" WI"
      ,City:"Rhinelander"
      ,Code:"RHI"
    },
    {
       Country:" Gabon "
      ,City:"Rhodes"
      ,Code:"RHO"
    },
    {
       Country:" Brazil "
      ,City:"Ribeirao Preto"
      ,Code:"RAO"
    },
    {
       Country:" Bolivia "
      ,City:"Riberalta"
      ,Code:"RIB"
    },
    {
       Country:" South Africa "
      ,City:"Richards Bay"
      ,Code:"RCB"
    },
    {
       Country:" Australia"
      ,City:"Richmond"
      ,Code:"RCM"
    },
    {
       Country:" VA "
      ,City:"Richmond"
      ,Code:"RIC"
    },
    {
       Country:" Latvia "
      ,City:"Riga"
      ,Code:"RIX"
    },
    {
       Country:" NL "
      ,City:"Rigolet"
      ,Code:"YRG"
    },
    {
       Country:" Croatia "
      ,City:"Rijeka"
      ,Code:"RJK"
    },
    {
       Country:" Italy "
      ,City:"Rimini"
      ,Code:"RMI"
    },
    {
       Country:" QC "
      ,City:"Rimouski"
      ,Code:"YXK"
    },
    {
       Country:" Brazil "
      ,City:"Rio Branco"
      ,Code:"RBR"
    },
    {
       Country:" Argentina "
      ,City:"Rio Cuarto"
      ,Code:"RCU"
    },
    {
       Country:" Brazil "
      ,City:"Rio De Janeiro"
      ,Code:"GIG"
    },
    {
       Country:" Argentina - Internacional "
      ,City:"Rio Gallegos"
      ,Code:"RGL"
    },
    {
       Country:" Brazil "
      ,City:"Rio Grande"
      ,Code:"RIG"
    },
    {
       Country:" Argentina "
      ,City:"Rio Grande"
      ,Code:"RGA"
    },
    {
       Country:" Argentina "
      ,City:"Rio Mayo"
      ,Code:"ROY"
    },
    {
       Country:" Brazil "
      ,City:"Rio Verde"
      ,Code:"RVD"
    },
    {
       Country:" Colombia "
      ,City:"Riohacha"
      ,Code:"RCH"
    },
    {
       Country:" Japan "
      ,City:"Rishiri"
      ,Code:"RIS"
    },
    {
       Country:" WY "
      ,City:"Riverton"
      ,Code:"RIW"
    },
    {
       Country:" QC - Rail service "
      ,City:"Riviere-a-Pierre"
      ,Code:"XRP"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Riyadh"
      ,Code:"RUH"
    },
    {
       Country:" Yemen "
      ,City:"Riyan Mukalla"
      ,Code:"RIY"
    },
    {
       Country:" France "
      ,City:"Roane"
      ,Code:"RNE"
    },
    {
       Country:" VA "
      ,City:"Roanoke"
      ,Code:"ROA"
    },
    {
       Country:" Honduras "
      ,City:"Roatan"
      ,Code:"RTB"
    },
    {
       Country:" QC "
      ,City:"Roberval"
      ,Code:"YRJ"
    },
    {
       Country:" Viet Nam "
      ,City:"Roch Gia"
      ,Code:"VKG"
    },
    {
       Country:" WA "
      ,City:"Roche Harbor"
      ,Code:"RCE"
    },
    {
       Country:" MN "
      ,City:"Rochester"
      ,Code:"RST"
    },
    {
       Country:" NY "
      ,City:"Rochester"
      ,Code:"ROC"
    },
    {
       Country:" Bahamas "
      ,City:"Rock Sound"
      ,Code:"RSD"
    },
    {
       Country:" WY "
      ,City:"Rock Springs"
      ,Code:"RKS"
    },
    {
       Country:" IL - Park&Ride Bus "
      ,City:"Rockford"
      ,Code:"ZRF"
    },
    {
       Country:" IL - Van Galder Bus "
      ,City:"Rockford"
      ,Code:"ZRK"
    },
    {
       Country:" Australia"
      ,City:"Rockhampton"
      ,Code:"ROK"
    },
    {
       Country:" ME "
      ,City:"Rockland"
      ,Code:"RKD"
    },
    {
       Country:" France "
      ,City:"Rodez"
      ,Code:"RDZ"
    },
    {
       Country:" Mauritius "
      ,City:"Rodrigues Island"
      ,Code:"RRG"
    },
    {
       Country:" Norway "
      ,City:"Roervik"
      ,Code:"RVK"
    },
    {
       Country:" Norway "
      ,City:"Rognan"
      ,Code:"ZXM"
    },
    {
       Country:" Australia"
      ,City:"Roma"
      ,Code:"RMA"
    },
    {
       Country:" Italy - All airports "
      ,City:"Rome"
      ,Code:"ROM"
    },
    {
       Country:" Italy - Ciampino "
      ,City:"Rome"
      ,Code:"CIA"
    },
    {
       Country:" Italy - Leonardo Da Vinci/Fiumicino "
      ,City:"Rome"
      ,Code:"FCO"
    },
    {
       Country:" Marshall Islands "
      ,City:"Rongelap Island"
      ,Code:"RNP"
    },
    {
       Country:" Sweden "
      ,City:"Ronneby"
      ,Code:"RNB"
    },
    {
       Country:" Norway "
      ,City:"Roros"
      ,Code:"RRS"
    },
    {
       Country:" French Polynesia "
      ,City:"Rorutu"
      ,Code:"RUR"
    },
    {
       Country:" Argentina "
      ,City:"Rosario"
      ,Code:"ROS"
    },
    {
       Country:" WA "
      ,City:"Rosario"
      ,Code:"RSJ"
    },
    {
       Country:" Iceland "
      ,City:"Rosh Pina"
      ,Code:"RPN"
    },
    {
       Country:" Norway "
      ,City:"Rost"
      ,Code:"RET"
    },
    {
       Country:" Germany "
      ,City:"Rostock-Laage"
      ,Code:"RLG"
    },
    {
       Country:" Russia "
      ,City:"Rostov"
      ,Code:"ROV"
    },
    {
       Country:" NM "
      ,City:"Roswell"
      ,Code:"ROW"
    },
    {
       Country:" Northern Mariana Islands "
      ,City:"Rota"
      ,Code:"ROP"
    },
    {
       Country:" New Zealand "
      ,City:"Rotorua"
      ,Code:"ROT"
    },
    {
       Country:" Netherlands "
      ,City:"Rotterdam"
      ,Code:"RTM"
    },
    {
       Country:" France "
      ,City:"Rouen"
      ,Code:"URO"
    },
    {
       Country:" ON "
      ,City:"Round Lake"
      ,Code:"ZRJ"
    },
    {
       Country:" QC "
      ,City:"Rouyn/Noranda"
      ,Code:"YUY"
    },
    {
       Country:" Finland "
      ,City:"Rovaniemi"
      ,Code:"RVN"
    },
    {
       Country:" AK "
      ,City:"Ruby"
      ,Code:"RBY"
    },
    {
       Country:" AK "
      ,City:"Russian Mission"
      ,Code:"RSH"
    },
    {
       Country:" VT "
      ,City:"Rutland"
      ,Code:"RUT"
    },
    {
       Country:" Mexico "
      ,City:"S. Cristobal del Casas"
      ,Code:"SZT"
    },
    {
       Country:" Germany "
      ,City:"Saarbruecken"
      ,Code:"QFZ"
    },
    {
       Country:" ON "
      ,City:"Sachigo Lake"
      ,Code:"ZPB"
    },
    {
       Country:" NT "
      ,City:"Sachs Harbour"
      ,Code:"YSY"
    },
    {
       Country:" NB - Rail service "
      ,City:"Sackville"
      ,Code:"XKV"
    },
    {
       Country:" CA "
      ,City:"Sacramento"
      ,Code:"SMF"
    },
    {
       Country:" MI "
      ,City:"Saginaw"
      ,Code:"MBS"
    },
    {
       Country:" MN "
      ,City:"Saint Cloud"
      ,Code:"STC"
    },
    {
       Country:" U.S. Virgin Islands "
      ,City:"Saint Croix"
      ,Code:"STX"
    },
    {
       Country:" AK "
      ,City:"Saint George Island"
      ,Code:"STG"
    },
    {
       Country:" UT "
      ,City:"Saint George"
      ,Code:"SGU"
    },
    {
       Country:" QC - Rail service "
      ,City:"Saint Hyacinthe"
      ,Code:"XIM"
    },
    {
       Country:" NB "
      ,City:"Saint John"
      ,Code:"YSJ"
    },
    {
       Country:" NL "
      ,City:"Saint Johns"
      ,Code:"YYT"
    },
    {
       Country:" NB "
      ,City:"Saint Leonard"
      ,Code:"YSL"
    },
    {
       Country:" MO "
      ,City:"Saint Louis"
      ,Code:"STL"
    },
    {
       Country:" ST. LUCIA "
      ,City:"Saint Lucia"
      ,Code:"SLU"
    },
    {
       Country:" Netherlands Antilles "
      ,City:"Saint Maarten"
      ,Code:"SXM"
    },
    {
       Country:" AK "
      ,City:"Saint Mary's"
      ,Code:"KSM"
    },
    {
       Country:" AK "
      ,City:"Saint Michael"
      ,Code:"SMK"
    },
    {
       Country:" AK "
      ,City:"Saint Paul Island"
      ,Code:"SNP"
    },
    {
       Country:" Russia - Pulkovo "
      ,City:"Saint Petersburg"
      ,Code:"LED"
    },
    {
       Country:" U.S. Virgin Islands "
      ,City:"Saint Thomas"
      ,Code:"STT"
    },
    {
       Country:" France "
      ,City:"Saint Tropez"
      ,Code:"XPZ"
    },
    {
       Country:" France - La Mole "
      ,City:"Saint Tropez"
      ,Code:"LTT"
    },
    {
       Country:" Northern Mariana Islands "
      ,City:"Saipan"
      ,Code:"SPN"
    },
    {
       Country:" Thailand "
      ,City:"Sakon Nakhon"
      ,Code:"SNO"
    },
    {
       Country:" Russia "
      ,City:"Salehard"
      ,Code:"SLY"
    },
    {
       Country:" OR "
      ,City:"Salem"
      ,Code:"SLE"
    },
    {
       Country:" KS "
      ,City:"Salina"
      ,Code:"SLN"
    },
    {
       Country:" MD "
      ,City:"Salisbury-Ocean City"
      ,Code:"SBY"
    },
    {
       Country:" QC "
      ,City:"Salluit"
      ,Code:"YZG"
    },
    {
       Country:" Turks and Caicos Islands "
      ,City:"Salt Cay"
      ,Code:"SLX"
    },
    {
       Country:" UT "
      ,City:"Salt Lake City"
      ,Code:"SLC"
    },
    {
       Country:" Mexico "
      ,City:"Saltillo"
      ,Code:"SLW"
    },
    {
       Country:" Brazil "
      ,City:"Salvadore"
      ,Code:"SSA"
    },
    {
       Country:" Austria "
      ,City:"Salzburg"
      ,Code:"SZG"
    },
    {
       Country:" Russia "
      ,City:"Samara"
      ,Code:"KUF"
    },
    {
       Country:" Madagascar "
      ,City:"Sambaua"
      ,Code:"SVB"
    },
    {
       Country:" Kenya "
      ,City:"Samburu"
      ,Code:"UAS"
    },
    {
       Country:" Greece "
      ,City:"Samos"
      ,Code:"SMI"
    },
    {
       Country:" Colombia "
      ,City:"San Andres Island"
      ,Code:"ADZ"
    },
    {
       Country:" TX "
      ,City:"San Angelo"
      ,Code:"SJT"
    },
    {
       Country:" Argentina "
      ,City:"San Antonio Oesta"
      ,Code:"OES"
    },
    {
       Country:" TX "
      ,City:"San Antonio"
      ,Code:"SAT"
    },
    {
       Country:" Venezuela "
      ,City:"San Antonio"
      ,Code:"SVZ"
    },
    {
       Country:" Argentina "
      ,City:"San Carlos"
      ,Code:"BRC"
    },
    {
       Country:" CA "
      ,City:"San Diego"
      ,Code:"SAN"
    },
    {
       Country:" CA "
      ,City:"San Francisco"
      ,Code:"SFO"
    },
    {
       Country:" CA "
      ,City:"San Jose"
      ,Code:"SJC"
    },
    {
       Country:" Costa Rica - Juan Santa Maria "
      ,City:"San Jose"
      ,Code:"SJO"
    },
    {
       Country:" Costa Rica - Tobias Bolanos Int'l "
      ,City:"San Jose"
      ,Code:"SYQ"
    },
    {
       Country:" Puerto Rico "
      ,City:"San Juan"
      ,Code:"SJU"
    },
    {
       Country:" Puerto Rico "
      ,City:"San Juan"
      ,Code:"SJU"
    },
    {
       Country:" Argentina "
      ,City:"San Juan"
      ,Code:"UAQ"
    },
    {
       Country:" Argentina "
      ,City:"San Julian"
      ,Code:"ULA"
    },
    {
       Country:" CA "
      ,City:"San Luis Obispo"
      ,Code:"SBP"
    },
    {
       Country:" Mexico "
      ,City:"San Luis Potosi"
      ,Code:"SLP"
    },
    {
       Country:" Argentina "
      ,City:"San Luis"
      ,Code:"LUQ"
    },
    {
       Country:" San Marino "
      ,City:"San Marino"
      ,Code:"SAI"
    },
    {
       Country:" Argentina "
      ,City:"San Martin De Los Andes"
      ,Code:"CPC"
    },
    {
       Country:" Panama "
      ,City:"San Miguel"
      ,Code:"NMG"
    },
    {
       Country:" Honduras "
      ,City:"San Pedro Sula"
      ,Code:"SAP"
    },
    {
       Country:" Argentina "
      ,City:"San Rafael"
      ,Code:"AFA"
    },
    {
       Country:" Bahamas "
      ,City:"San Salvador"
      ,Code:"ZSA"
    },
    {
       Country:" El Salvador "
      ,City:"San Salvador"
      ,Code:"SAL"
    },
    {
       Country:" Spain "
      ,City:"San Sebastian"
      ,Code:"EAS"
    },
    {
       Country:" Yemen "
      ,City:"Sana'a"
      ,Code:"SAH"
    },
    {
       Country:" AK "
      ,City:"Sand Point"
      ,Code:"SDP"
    },
    {
       Country:" United Kingdom "
      ,City:"Sanday"
      ,Code:"NDY"
    },
    {
       Country:" ON "
      ,City:"Sandy Lake"
      ,Code:"ZSJ"
    },
    {
       Country:" FL "
      ,City:"Sanford"
      ,Code:"SFB"
    },
    {
       Country:" NU "
      ,City:"Sanikiluaq"
      ,Code:"YSK"
    },
    {
       Country:" CA "
      ,City:"Santa Ana"
      ,Code:"SNA"
    },
    {
       Country:" Solomon Islands "
      ,City:"Santa Ana"
      ,Code:"NNB"
    },
    {
       Country:" CA "
      ,City:"Santa Barbara"
      ,Code:"SBA"
    },
    {
       Country:" Venezuela "
      ,City:"Santa Barbara"
      ,Code:"STB"
    },
    {
       Country:" Spain and Canary Islands - La Palma "
      ,City:"Santa Cruz De La Palma"
      ,Code:"SPC"
    },
    {
       Country:" Bolivia "
      ,City:"Santa Cruz"
      ,Code:"VVI"
    },
    {
       Country:" NM "
      ,City:"Santa Fe"
      ,Code:"SAF"
    },
    {
       Country:" Brazil "
      ,City:"Santa Maria"
      ,Code:"RIA"
    },
    {
       Country:" CA "
      ,City:"Santa Maria"
      ,Code:"SMX"
    },
    {
       Country:" Portugal "
      ,City:"Santa Maria"
      ,Code:"SMA"
    },
    {
       Country:" Colombia "
      ,City:"Santa Marta"
      ,Code:"SMR"
    },
    {
       Country:" CA "
      ,City:"Santa Rosa"
      ,Code:"STS"
    },
    {
       Country:" Argentina "
      ,City:"Santa Rosa"
      ,Code:"RSA"
    },
    {
       Country:" Brazil "
      ,City:"Santarem"
      ,Code:"STM"
    },
    {
       Country:" Madagascar "
      ,City:"Sante Marie"
      ,Code:"SMS"
    },
    {
       Country:" Chile "
      ,City:"Santiago"
      ,Code:"SCL"
    },
    {
       Country:" Dominican Republic "
      ,City:"Santiago"
      ,Code:"STI"
    },
    {
       Country:" Brazil "
      ,City:"Santo Angelo"
      ,Code:"GEL"
    },
    {
       Country:" Cape Verde "
      ,City:"Santo Antao"
      ,Code:"NTO"
    },
    {
       Country:" Dominican Republic - Herrera "
      ,City:"Santo Domingo"
      ,Code:"HEX"
    },
    {
       Country:" Dominican Republic - Las Americas "
      ,City:"Santo Domingo"
      ,Code:"SDQ"
    },
    {
       Country:" Venezuela "
      ,City:"Santo Domingo"
      ,Code:"STD"
    },
    {
       Country:" China "
      ,City:"Sanya"
      ,Code:"SYX"
    },
    {
       Country:" Cape Verde "
      ,City:"Sao Nicolau"
      ,Code:"SNE"
    },
    {
       Country:" Brazil - Congonhas "
      ,City:"Sao Paulo"
      ,Code:"CGH"
    },
    {
       Country:" Brazil - Guarulhos Intl "
      ,City:"Sao Paulo"
      ,Code:"GRU"
    },
    {
       Country:" Brazil - Viracopos "
      ,City:"Sao Paulo"
      ,Code:"VCP"
    },
    {
       Country:" Sao Tome and Principe "
      ,City:"Sao Tome Is."
      ,Code:"TMS"
    },
    {
       Country:" Cape Verde "
      ,City:"Sao Vicente"
      ,Code:"VXE"
    },
    {
       Country:" Japan - Chitose "
      ,City:"Sapporo"
      ,Code:"CTS"
    },
    {
       Country:" Japan - Okadama "
      ,City:"Sapporo"
      ,Code:"OKD"
    },
    {
       Country:" Vanuatu "
      ,City:"Sara"
      ,Code:"SSR"
    },
    {
       Country:" NY "
      ,City:"Saranac Lake"
      ,Code:"SLK"
    },
    {
       Country:" FL "
      ,City:"Sarasota"
      ,Code:"SRQ"
    },
    {
       Country:" Russia "
      ,City:"Saratov"
      ,Code:"RTW"
    },
    {
       Country:" Indonesia "
      ,City:"Sarmi"
      ,Code:"ZRM"
    },
    {
       Country:" ON "
      ,City:"Sarnia"
      ,Code:"YZR"
    },
    {
       Country:" ON - Rail service "
      ,City:"Sarnia"
      ,Code:"XDX"
    },
    {
       Country:" SK "
      ,City:"Saskatoon"
      ,Code:"YXE"
    },
    {
       Country:" Romania "
      ,City:"Satu Mare"
      ,Code:"SUJ"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Satwag"
      ,Code:"SWG"
    },
    {
       Country:" Brazil "
      ,City:"Sau Luiz"
      ,Code:"SLZ"
    },
    {
       Country:" MI"
      ,City:"Sault Ste Marie"
      ,Code:"CIU"
    },
    {
       Country:" ON "
      ,City:"Sault Ste-Marie"
      ,Code:"YAM"
    },
    {
       Country:" Indonesia "
      ,City:"Saumlaki"
      ,Code:"SXK"
    },
    {
       Country:" GA "
      ,City:"Savannah"
      ,Code:"SAV"
    },
    {
       Country:" Laos "
      ,City:"Savannakhet"
      ,Code:"ZVK"
    },
    {
       Country:" Finland "
      ,City:"Savonlinna"
      ,Code:"SVL"
    },
    {
       Country:" AK "
      ,City:"Savoonga"
      ,Code:"SVA"
    },
    {
       Country:" Fiji "
      ,City:"Savusavu"
      ,Code:"SVU"
    },
    {
       Country:" Laos "
      ,City:"Sayaboury"
      ,Code:"ZBY"
    },
    {
       Country:" AK "
      ,City:"Scammon Bay"
      ,Code:"SCM"
    },
    {
       Country:" QC "
      ,City:"Schefferville"
      ,Code:"YKL"
    },
    {
       Country:" NE "
      ,City:"Scottsbluff"
      ,Code:"BFF"
    },
    {
       Country:" PA "
      ,City:"Scranton"
      ,Code:"AVP"
    },
    {
       Country:" WA - Lake Union SPB "
      ,City:"Seattle"
      ,Code:"LKE"
    },
    {
       Country:" WA - Seattle/Tacoma International "
      ,City:"Seattle"
      ,Code:"SEA"
    },
    {
       Country:" Solomon Islands "
      ,City:"Sege"
      ,Code:"EGM"
    },
    {
       Country:" Yemen "
      ,City:"Seiyun"
      ,Code:"GXF"
    },
    {
       Country:" AK "
      ,City:"Selawik"
      ,Code:"WLK"
    },
    {
       Country:" Norway "
      ,City:"Selje"
      ,Code:"QFK"
    },
    {
       Country:" Indonesia "
      ,City:"Semarang"
      ,Code:"SRG"
    },
    {
       Country:" Indonesia "
      ,City:"Senggo"
      ,Code:"ZEG"
    },
    {
       Country:" QC - Rail service "
      ,City:"Senneterre"
      ,Code:"XFK"
    },
    {
       Country:" South Korea - All Airports "
      ,City:"Seoul"
      ,Code:"SEL"
    },
    {
       Country:" South Korea - Gimpo International "
      ,City:"Seoul"
      ,Code:"GMP"
    },
    {
       Country:" South Korea - Incheon International "
      ,City:"Seoul"
      ,Code:"ICN"
    },
    {
       Country:" QC "
      ,City:"Sept-Iles"
      ,Code:"YZV"
    },
    {
       Country:" Indonesia "
      ,City:"Servi"
      ,Code:"ZRI"
    },
    {
       Country:" Namibia "
      ,City:"Sesriem"
      ,Code:"SZM"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Sevilla"
      ,Code:"SVQ"
    },
    {
       Country:" AK "
      ,City:"Seward"
      ,Code:"SWD"
    },
    {
       Country:" AK "
      ,City:"Shageluk"
      ,Code:"SHX"
    },
    {
       Country:" AK "
      ,City:"Shaktoolik"
      ,Code:"SKK"
    },
    {
       Country:" MB "
      ,City:"Shamattawa"
      ,Code:"ZTM"
    },
    {
       Country:" China "
      ,City:"Shanghai"
      ,Code:"PVG"
    },
    {
       Country:" Ireland "
      ,City:"Shannon"
      ,Code:"SNN"
    },
    {
       Country:" China "
      ,City:"Shantou"
      ,Code:"SWA"
    },
    {
       Country:" Egypt "
      ,City:"Sharm El Sheikh"
      ,Code:"SSH"
    },
    {
       Country:" QC - Rail service "
      ,City:"Shawinigan"
      ,Code:"XFL"
    },
    {
       Country:" BC - Rail service "
      ,City:"Shawnigan"
      ,Code:"XFM"
    },
    {
       Country:" United Kingdom "
      ,City:"Sheffield"
      ,Code:"SZD"
    },
    {
       Country:" AL "
      ,City:"Sheffield/Florence/Muscle Shoals"
      ,Code:"MSL"
    },
    {
       Country:" AK "
      ,City:"Sheldon Point"
      ,Code:"SXP"
    },
    {
       Country:" China "
      ,City:"Shenzhen"
      ,Code:"SZX"
    },
    {
       Country:" WY "
      ,City:"Sheridan"
      ,Code:"SHR"
    },
    {
       Country:" United Kingdom - Lerwick/Tingwall "
      ,City:"Shetland Islands"
      ,Code:"LWK"
    },
    {
       Country:" United Kingdom - Sumburgh "
      ,City:"Shetland Islands"
      ,Code:"LSI"
    },
    {
       Country:" Ethiopia "
      ,City:"Shillavo"
      ,Code:"HIL"
    },
    {
       Country:" Kazakhstan "
      ,City:"Shimkent"
      ,Code:"CIT"
    },
    {
       Country:" Iran "
      ,City:"Shiraz"
      ,Code:"SYZ"
    },
    {
       Country:" AK "
      ,City:"Shishmaref"
      ,Code:"SHH"
    },
    {
       Country:" Japan "
      ,City:"Shonai"
      ,Code:"SYO"
    },
    {
       Country:" LA "
      ,City:"Shreveport"
      ,Code:"SHV"
    },
    {
       Country:" AK "
      ,City:"Shungnak"
      ,Code:"SHG"
    },
    {
       Country:" Australia "
      ,City:"Shute Harbor"
      ,Code:"JHQ"
    },
    {
       Country:" Cambodia "
      ,City:"Siem Reap"
      ,Code:"REP"
    },
    {
       Country:" India "
      ,City:"Silchar"
      ,Code:"IXS"
    },
    {
       Country:" NM "
      ,City:"Silver City"
      ,Code:"SVC"
    },
    {
       Country:" China "
      ,City:"Simao"
      ,Code:"SYM"
    },
    {
       Country:" Indonesia "
      ,City:"Sinak"
      ,Code:"NKD"
    },
    {
       Country:" Singapore - Changi "
      ,City:"Singapore"
      ,Code:"SIN"
    },
    {
       Country:" Singapore - Seletar "
      ,City:"Singapore"
      ,Code:"XSP"
    },
    {
       Country:" Indonesia "
      ,City:"Sintang"
      ,Code:"SQG"
    },
    {
       Country:" IA "
      ,City:"Sioux City"
      ,Code:"SUX"
    },
    {
       Country:" SD "
      ,City:"Sioux Falls"
      ,Code:"FSD"
    },
    {
       Country:" ON "
      ,City:"Sioux Lookout"
      ,Code:"YXL"
    },
    {
       Country:" Greenland "
      ,City:"Sisimiut"
      ,Code:"JHS"
    },
    {
       Country:" AK "
      ,City:"Sitka"
      ,Code:"SIT"
    },
    {
       Country:" Myanmar "
      ,City:"Sittwe"
      ,Code:"AKY"
    },
    {
       Country:" Turkey "
      ,City:"Sivas"
      ,Code:"VAS"
    },
    {
       Country:" AK "
      ,City:"Skagway"
      ,Code:"SGY"
    },
    {
       Country:" Greece "
      ,City:"Skiathos"
      ,Code:"JSI"
    },
    {
       Country:" Macedonia "
      ,City:"Skopie"
      ,Code:"FYROM"
    },
    {
       Country:" Sweden "
      ,City:"Skovde"
      ,Code:"KVB"
    },
    {
       Country:" South Africa "
      ,City:"Skukuza"
      ,Code:"SZK"
    },
    {
       Country:" AK "
      ,City:"Sleetmore"
      ,Code:"SLQ"
    },
    {
       Country:" Ireland "
      ,City:"Sligo"
      ,Code:"SXL"
    },
    {
       Country:" ON "
      ,City:"Smith Falls"
      ,Code:"YSH"
    },
    {
       Country:" BC "
      ,City:"Smithers"
      ,Code:"YYD"
    },
    {
       Country:" NT "
      ,City:"Snare Lake"
      ,Code:"YFJ"
    },
    {
       Country:" Madagascar "
      ,City:"Soalala"
      ,Code:"DWB"
    },
    {
       Country:" Sweden "
      ,City:"Soderham"
      ,Code:"SOO"
    },
    {
       Country:" Bulgaria "
      ,City:"Sofia"
      ,Code:"SOF"
    },
    {
       Country:" Norway "
      ,City:"Sognolal"
      ,Code:"SOG"
    },
    {
       Country:" Indonesia "
      ,City:"Solo City"
      ,Code:"SOC"
    },
    {
       Country:" Viet Nam - Na-San "
      ,City:"Son-La"
      ,Code:"SQH"
    },
    {
       Country:" Norway "
      ,City:"Sorkjosen"
      ,Code:"SOJ"
    },
    {
       Country:" Brazil "
      ,City:"Sorocaba"
      ,Code:"SOD"
    },
    {
       Country:" Bahamas "
      ,City:"South Andros"
      ,Code:"TZN"
    },
    {
       Country:" IN "
      ,City:"South Bend"
      ,Code:"SBN"
    },
    {
       Country:" Turks and Caicos Islands "
      ,City:"South Caicos"
      ,Code:"XSC"
    },
    {
       Country:" United Kingdom "
      ,City:"South Hampton"
      ,Code:"SOU"
    },
    {
       Country:" MB "
      ,City:"South Indian Lake"
      ,Code:"XSI"
    },
    {
       Country:" Australia"
      ,City:"South Molle Island"
      ,Code:"SOI"
    },
    {
       Country:" AK "
      ,City:"South Naknek"
      ,Code:"WSN"
    },
    {
       Country:" NC "
      ,City:"Southern Pines"
      ,Code:"SOP"
    },
    {
       Country:" SC "
      ,City:"Spartanburg/Greenville"
      ,Code:"GSP"
    },
    {
       Country:" Croatia "
      ,City:"Split"
      ,Code:"SPU"
    },
    {
       Country:" WA "
      ,City:"Spokane"
      ,Code:"GEG"
    },
    {
       Country:" Bahamas "
      ,City:"Spring Point"
      ,Code:"AXP"
    },
    {
       Country:" IL "
      ,City:"Springfield"
      ,Code:"SPI"
    },
    {
       Country:" MO "
      ,City:"Springfield"
      ,Code:"SGF"
    },
    {
       Country:" India "
      ,City:"Srinagar"
      ,Code:"SXR"
    },
    {
       Country:" NL "
      ,City:"St Anthony"
      ,Code:"YAY"
    },
    {
       Country:" ON "
      ,City:"St Catharines"
      ,Code:"YCM"
    },
    {
       Country:" Reunion "
      ,City:"St Denis de la Reunion"
      ,Code:"RUN"
    },
    {
       Country:" St Kitts and Nevis "
      ,City:"St Kitts"
      ,Code:"SKB"
    },
    {
       Country:" ON - Rail service "
      ,City:"St Marys"
      ,Code:"XIO"
    },
    {
       Country:" FL "
      ,City:"St Petersburg/Clearwater"
      ,Code:"PIE"
    },
    {
       Country:" St Pierre and Miquelon "
      ,City:"St Pierre"
      ,Code:"FSP"
    },
    {
       Country:" Saint Vincent and the Grenadines "
      ,City:"St Vincent"
      ,Code:"SVD"
    },
    {
       Country:" U.S. Virgin Islands "
      ,City:"St. Croix Island"
      ,Code:"STX"
    },
    {
       Country:" France "
      ,City:"St. Etienne"
      ,Code:"EBU"
    },
    {
       Country:" Netherlands Antilles "
      ,City:"St. Eustatius"
      ,Code:"EUX"
    },
    {
       Country:" St. Lucia "
      ,City:"St. Lucia"
      ,Code:"UVF"
    },
    {
       Country:" St. Lucia - Hawnorra "
      ,City:"St. Lucia"
      ,Code:"UVF"
    },
    {
       Country:" Russia "
      ,City:"St. Petersburg"
      ,Code:"LED"
    },
    {
       Country:" Reunion "
      ,City:"St. Pierre de la Reunion"
      ,Code:"ZSE"
    },
    {
       Country:" U.S. Virgin Islands "
      ,City:"St. Thomas Island"
      ,Code:"STT"
    },
    {
       Country:" PA "
      ,City:"State College/University Park"
      ,Code:"SCE"
    },
    {
       Country:" VA "
      ,City:"Staunton"
      ,Code:"SHD"
    },
    {
       Country:" Norway "
      ,City:"Stavanger"
      ,Code:"SVG"
    },
    {
       Country:" Russia "
      ,City:"Stavropol"
      ,Code:"STW"
    },
    {
       Country:" MB "
      ,City:"Ste Therese Point"
      ,Code:"YST"
    },
    {
       Country:" CO "
      ,City:"Steamboat Springs"
      ,Code:"SBS"
    },
    {
       Country:" AK "
      ,City:"Stebbins"
      ,Code:"WBB"
    },
    {
       Country:" Bahamas "
      ,City:"Stella Maris"
      ,Code:"SML"
    },
    {
       Country:" NL "
      ,City:"Stephenville"
      ,Code:"YJT"
    },
    {
       Country:" WI "
      ,City:"Stevens Point/Wausau"
      ,Code:"CWA"
    },
    {
       Country:" AK "
      ,City:"Stevens Village"
      ,Code:"SVS"
    },
    {
       Country:" NY "
      ,City:"Stewart Field/Newburgh"
      ,Code:"SWF"
    },
    {
       Country:" Sweden - All airports "
      ,City:"Stockholm"
      ,Code:"STO"
    },
    {
       Country:" Sweden - Arlanda "
      ,City:"Stockholm"
      ,Code:"ARN"
    },
    {
       Country:" Sweden - Bromma "
      ,City:"Stockholm"
      ,Code:"BMA"
    },
    {
       Country:" CA "
      ,City:"Stockton"
      ,Code:"SCK"
    },
    {
       Country:" SK "
      ,City:"Stony Rapids"
      ,Code:"YSF"
    },
    {
       Country:" AK "
      ,City:"Stony River"
      ,Code:"SRV"
    },
    {
       Country:" United Kingdom "
      ,City:"Stornoway"
      ,Code:"SYY"
    },
    {
       Country:" Sweden "
      ,City:"Storuman"
      ,Code:"SQO"
    },
    {
       Country:" France - Bus service "
      ,City:"Strasbourg"
      ,Code:"XER"
    },
    {
       Country:" France - Entzheim "
      ,City:"Strasbourg"
      ,Code:"SXB"
    },
    {
       Country:" ON - Rail service "
      ,City:"Strathroy"
      ,Code:"XTY"
    },
    {
       Country:" United Kingdom "
      ,City:"Stronsay"
      ,Code:"SOY"
    },
    {
       Country:" Cambodia "
      ,City:"Stung Treng"
      ,Code:"TNX"
    },
    {
       Country:" Germany - Echterdingen "
      ,City:"Stuttgart"
      ,Code:"STR"
    },
    {
       Country:" Germany - Rail service "
      ,City:"Stuttgart"
      ,Code:"ZWS"
    },
    {
       Country:" Solomon Islands "
      ,City:"Suavanao"
      ,Code:"VAO"
    },
    {
       Country:" Bolivia "
      ,City:"Sucre"
      ,Code:"SRE"
    },
    {
       Country:" ON "
      ,City:"Sudbury"
      ,Code:"YSB"
    },
    {
       Country:" ON - Rail service "
      ,City:"Sudbury"
      ,Code:"XDY"
    },
    {
       Country:" Australia"
      ,City:"Sue Island"
      ,Code:"SYU"
    },
    {
       Country:" Pakistan "
      ,City:"Sui"
      ,Code:"SUL"
    },
    {
       Country:" Thailand "
      ,City:"Sukhotthai"
      ,Code:"THS"
    },
    {
       Country:" ON "
      ,City:"Summer Beaver"
      ,Code:"SUR"
    },
    {
       Country:" South Africa "
      ,City:"Sun City"
      ,Code:"NTY"
    },
    {
       Country:" ID "
      ,City:"Sun Valley"
      ,Code:"SUN"
    },
    {
       Country:" Australia"
      ,City:"Sunshine Coast"
      ,Code:"MCY"
    },
    {
       Country:" Indonesia "
      ,City:"Surabaya"
      ,Code:"SUB"
    },
    {
       Country:" Thailand "
      ,City:"Surat Thani"
      ,Code:"URT"
    },
    {
       Country:" Fiji "
      ,City:"Suva"
      ,Code:"SUV"
    },
    {
       Country:" Sweden "
      ,City:"Sveg"
      ,Code:"EVG"
    },
    {
       Country:" Norway "
      ,City:"Svolvaer"
      ,Code:"SVJ"
    },
    {
       Country:" MB "
      ,City:"Swan River"
      ,Code:"ZJN"
    },
    {
       Country:" Australia "
      ,City:"Sydney"
      ,Code:"SYD"
    },
    {
       Country:" NS "
      ,City:"Sydney"
      ,Code:"YQY"
    },
    {
       Country:" Bangladesh "
      ,City:"Sylhet"
      ,Code:"ZYL"
    },
    {
       Country:" NY "
      ,City:"Syracuse"
      ,Code:"SYR"
    },
    {
       Country:" Poland "
      ,City:"Szczecin"
      ,Code:"SZZ"
    },
    {
       Country:" Egypt "
      ,City:"Taba"
      ,Code:"TCP"
    },
    {
       Country:" Tunisia "
      ,City:"Tabarka"
      ,Code:"TBJ"
    },
    {
       Country:" Brazil "
      ,City:"Tabatinga"
      ,Code:"TBT"
    },
    {
       Country:" Tanzania "
      ,City:"Tabora"
      ,Code:"TBO"
    },
    {
       Country:" Iran "
      ,City:"Tabriz"
      ,Code:"TBZ"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Tabubil"
      ,Code:"TBG"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Tabuk"
      ,Code:"TUU"
    },
    {
       Country:" China "
      ,City:"Tacheng"
      ,Code:"TCG"
    },
    {
       Country:" Myanmar "
      ,City:"Tachilek"
      ,Code:"THL"
    },
    {
       Country:" Philippines "
      ,City:"Tacloban"
      ,Code:"TAC"
    },
    {
       Country:" Peru "
      ,City:"Tacna"
      ,Code:"TCQ"
    },
    {
       Country:" MB "
      ,City:"Tadoule Lake"
      ,Code:"XTL"
    },
    {
       Country:" Taiwan "
      ,City:"Taichung"
      ,Code:"TXG"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Taif"
      ,Code:"TIF"
    },
    {
       Country:" Taiwan "
      ,City:"Tainan"
      ,Code:"TNN"
    },
    {
       Country:" Taiwan - Chiang Kai Shek "
      ,City:"Taipei"
      ,Code:"TPE"
    },
    {
       Country:" Taiwan - Sung Shan "
      ,City:"Taipei"
      ,Code:"TSA"
    },
    {
       Country:" Taiwan "
      ,City:"Taitung"
      ,Code:"TTT"
    },
    {
       Country:" China "
      ,City:"Taiyuan"
      ,Code:"TYN"
    },
    {
       Country:" Yemen "
      ,City:"Taiz"
      ,Code:"TAI"
    },
    {
       Country:" AK "
      ,City:"Takotna"
      ,Code:"TCT"
    },
    {
       Country:" AK "
      ,City:"Talkeetna"
      ,Code:"TKA"
    },
    {
       Country:" FL "
      ,City:"Tallahassee"
      ,Code:"TLH"
    },
    {
       Country:" Estonia "
      ,City:"Tallinn"
      ,Code:"TLL"
    },
    {
       Country:" NU "
      ,City:"Taloyoak"
      ,Code:"YYH"
    },
    {
       Country:" Algeria "
      ,City:"Tamanrasset"
      ,Code:"TMR"
    },
    {
       Country:" Costa Rica "
      ,City:"Tamarindo"
      ,Code:"TNO"
    },
    {
       Country:" Madagascar "
      ,City:"Tamatave"
      ,Code:"TMM"
    },
    {
       Country:" Madagascar"
      ,City:"Tambohorano"
      ,Code:"WTA"
    },
    {
       Country:" Indonesia "
      ,City:"Tambolaka"
      ,Code:"TMC"
    },
    {
       Country:" Costa Rica "
      ,City:"Tambor"
      ,Code:"TMU"
    },
    {
       Country:" FL "
      ,City:"Tampa"
      ,Code:"TPA"
    },
    {
       Country:" Finland "
      ,City:"Tampere"
      ,Code:"TMP"
    },
    {
       Country:" Mexico "
      ,City:"Tampico"
      ,Code:"TAM"
    },
    {
       Country:" Australia "
      ,City:"Tamworth"
      ,Code:"TMW"
    },
    {
       Country:" Indonesia "
      ,City:"Tanahmerah"
      ,Code:"TMH"
    },
    {
       Country:" AK "
      ,City:"Tanana"
      ,Code:"TAL"
    },
    {
       Country:" Morocco "
      ,City:"Tangier"
      ,Code:"TNG"
    },
    {
       Country:" Indonesia "
      ,City:"Tanjung Pandan"
      ,Code:"TJQ"
    },
    {
       Country:" Indonesia "
      ,City:"Tanjung Selor"
      ,Code:"TJS"
    },
    {
       Country:" Vanuatu "
      ,City:"Tanna"
      ,Code:"TAH"
    },
    {
       Country:" NM "
      ,City:"Taos"
      ,Code:"TSM"
    },
    {
       Country:" Mexico "
      ,City:"Tapachula"
      ,Code:"TAP"
    },
    {
       Country:" Indonesia "
      ,City:"Tarakan"
      ,Code:"TRK"
    },
    {
       Country:" Japan "
      ,City:"Taramajma"
      ,Code:"TRA"
    },
    {
       Country:" Italy "
      ,City:"Taranto"
      ,Code:"TAR"
    },
    {
       Country:" Peru "
      ,City:"Tarapoto"
      ,Code:"TPP"
    },
    {
       Country:" Kiribati "
      ,City:"Tarawa"
      ,Code:"TRW"
    },
    {
       Country:" Australia "
      ,City:"Taree"
      ,Code:"TRO"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Tari"
      ,Code:"TIZ"
    },
    {
       Country:" Bolivia "
      ,City:"Tarija"
      ,Code:"TJA"
    },
    {
       Country:" Uzbekistan "
      ,City:"Tashkent"
      ,Code:"TAS"
    },
    {
       Country:" QC "
      ,City:"Tasiujuaq"
      ,Code:"YTQ"
    },
    {
       Country:" AK "
      ,City:"Tatitlek"
      ,Code:"TEK"
    },
    {
       Country:" New Zealand "
      ,City:"Taupo"
      ,Code:"TUO"
    },
    {
       Country:" New Zealand "
      ,City:"Tauranga"
      ,Code:"TRG"
    },
    {
       Country:" Fiji "
      ,City:"Taveuni"
      ,Code:"TVU"
    },
    {
       Country:" Malaysia "
      ,City:"Tawau"
      ,Code:"TWU"
    },
    {
       Country:" Algeria "
      ,City:"Tbessa"
      ,Code:"TEE"
    },
    {
       Country:" Georgia "
      ,City:"Tbilisi"
      ,Code:"TBS"
    },
    {
       Country:" Gabon "
      ,City:"Tchibanga"
      ,Code:"TCH"
    },
    {
       Country:" New Zealand "
      ,City:"Te Anau"
      ,Code:"TEU"
    },
    {
       Country:" United Kingdom "
      ,City:"Teesside"
      ,Code:"MME"
    },
    {
       Country:" Brazil "
      ,City:"Tefe"
      ,Code:"TFF"
    },
    {
       Country:" Honduras "
      ,City:"Tegucigalpa"
      ,Code:"TGU"
    },
    {
       Country:" Iran - Mehrabad "
      ,City:"Tehran"
      ,Code:"THR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Tekadu"
      ,Code:"TKB"
    },
    {
       Country:" Israel "
      ,City:"Tel Aviv"
      ,Code:"TLV"
    },
    {
       Country:" AK "
      ,City:"Teller Mission"
      ,Code:"KTS"
    },
    {
       Country:" CO "
      ,City:"Telluride"
      ,Code:"TEX"
    },
    {
       Country:" Indonesia "
      ,City:"Tembagapura"
      ,Code:"TIM"
    },
    {
       Country:" Indonesia "
      ,City:"Teminabuan"
      ,Code:"TXM"
    },
    {
       Country:" Chile "
      ,City:"Temuco"
      ,Code:"ZCO"
    },
    {
       Country:" AK "
      ,City:"Tenakee Springs"
      ,Code:"TKE"
    },
    {
       Country:" Spain and Canary Islands - Norte Los Rodeos "
      ,City:"Tenerife"
      ,Code:"TFN"
    },
    {
       Country:" Spain and the Canary Islands - Sur Reina Sofia "
      ,City:"Tenerife"
      ,Code:"TFS"
    },
    {
       Country:" Australia "
      ,City:"Tennant Creek"
      ,Code:"TCA"
    },
    {
       Country:" Mexico "
      ,City:"Tepic"
      ,Code:"TPQ"
    },
    {
       Country:" Portugal "
      ,City:"Terceira Island"
      ,Code:"TER"
    },
    {
       Country:" Brazil "
      ,City:"Teresina"
      ,Code:"THE"
    },
    {
       Country:" Uzbekistan "
      ,City:"Termez"
      ,Code:"TMJ"
    },
    {
       Country:" Indonesia "
      ,City:"Ternate"
      ,Code:"TTE"
    },
    {
       Country:" BC "
      ,City:"Terrace"
      ,Code:"YXT"
    },
    {
       Country:" IN "
      ,City:"Terre Haute"
      ,Code:"HUF"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Tetabedi"
      ,Code:"TDB"
    },
    {
       Country:" Mozambique "
      ,City:"Tete"
      ,Code:"TET"
    },
    {
       Country:" QC "
      ,City:"Tete-a-La Baleine"
      ,Code:"ZTB"
    },
    {
       Country:" AK "
      ,City:"Tetlin"
      ,Code:"TEH"
    },
    {
       Country:" Morocco "
      ,City:"Tetuan"
      ,Code:"TTU"
    },
    {
       Country:" AR "
      ,City:"Texarkana"
      ,Code:"TXK"
    },
    {
       Country:" India "
      ,City:"Tezpur"
      ,Code:"TEZ"
    },
    {
       Country:" Myanmar "
      ,City:"Thandwe"
      ,Code:"SNW"
    },
    {
       Country:" Australia"
      ,City:"Thangool"
      ,Code:"THG"
    },
    {
       Country:" Australia"
      ,City:"Thargomindah"
      ,Code:"XTG"
    },
    {
       Country:" Bahamas "
      ,City:"The Bight"
      ,Code:"TBI"
    },
    {
       Country:" MB "
      ,City:"The Pas"
      ,Code:"YQD"
    },
    {
       Country:" MB - Rail service "
      ,City:"The Pas"
      ,Code:"XDZ"
    },
    {
       Country:" Greece "
      ,City:"Thessaloniki"
      ,Code:"SKG"
    },
    {
       Country:" MB "
      ,City:"Thicket Portage"
      ,Code:"YTD"
    },
    {
       Country:" MN "
      ,City:"Thief River Falls"
      ,Code:"TVF"
    },
    {
       Country:" Greece "
      ,City:"Thira"
      ,Code:"JTR"
    },
    {
       Country:" India "
      ,City:"Thiruvananthapuram"
      ,Code:"TRV"
    },
    {
       Country:" MB "
      ,City:"Thompson"
      ,Code:"YTH"
    },
    {
       Country:" AK "
      ,City:"Thorne Bay"
      ,Code:"KTB"
    },
    {
       Country:" Iceland "
      ,City:"Thorshofn"
      ,Code:"THO"
    },
    {
       Country:" ON "
      ,City:"Thunder Bay"
      ,Code:"YQT"
    },
    {
       Country:" Australia"
      ,City:"Thursday Island"
      ,Code:"TIS"
    },
    {
       Country:" China "
      ,City:"Tianjn"
      ,Code:"TSN"
    },
    {
       Country:" Algeria "
      ,City:"Tiaret"
      ,Code:"TID"
    },
    {
       Country:" New Caledonia "
      ,City:"Tiga"
      ,Code:"TGJ"
    },
    {
       Country:" Mexico "
      ,City:"Tijuana"
      ,Code:"TIJ"
    },
    {
       Country:" French Polynesia "
      ,City:"Tikehau Atoll"
      ,Code:"TIH"
    },
    {
       Country:" Russia "
      ,City:"Tiksi"
      ,Code:"IKS"
    },
    {
       Country:" New Zealand "
      ,City:"Timaru"
      ,Code:"TIU"
    },
    {
       Country:" Algeria "
      ,City:"Timimoun"
      ,Code:"TMX"
    },
    {
       Country:" ON "
      ,City:"Timmins"
      ,Code:"YTS"
    },
    {
       Country:" Romania "
      ,City:"Timosoara"
      ,Code:"TSR"
    },
    {
       Country:" AK "
      ,City:"Tin City"
      ,Code:"TNC"
    },
    {
       Country:" Algeria "
      ,City:"Tindouf"
      ,Code:"TIN"
    },
    {
       Country:" Northern Mariana Islands "
      ,City:"Tinian"
      ,Code:"TIQ"
    },
    {
       Country:" Mauritania "
      ,City:"Tioljikja"
      ,Code:"TIY"
    },
    {
       Country:" Malaysia "
      ,City:"Tioman"
      ,Code:"TOD"
    },
    {
       Country:" Ethiopia "
      ,City:"Tippi"
      ,Code:"TIE"
    },
    {
       Country:" Albania "
      ,City:"Tirana"
      ,Code:"TIA"
    },
    {
       Country:" United Kingdom "
      ,City:"Tiree"
      ,Code:"TRE"
    },
    {
       Country:" Romania "
      ,City:"Tirgu Mures"
      ,Code:"TGM"
    },
    {
       Country:" India "
      ,City:"Tiruchirapally"
      ,Code:"TRZ"
    },
    {
       Country:" India "
      ,City:"Tirupati"
      ,Code:"TIR"
    },
    {
       Country:" Serbia and Montenegro "
      ,City:"Tivat"
      ,Code:"TIV"
    },
    {
       Country:" Algeria "
      ,City:"Tlemcen"
      ,Code:"TLM"
    },
    {
       Country:" Trinidad and Tobago "
      ,City:"Tobago"
      ,Code:"TAB"
    },
    {
       Country:" Libya "
      ,City:"Tobruk"
      ,Code:"TOB"
    },
    {
       Country:" BC"
      ,City:"Tofino"
      ,Code:"YAZ"
    },
    {
       Country:" AK "
      ,City:"Togiak Village"
      ,Code:"TOG"
    },
    {
       Country:" AK "
      ,City:"Tok"
      ,Code:"TKJ"
    },
    {
       Country:" AK "
      ,City:"Toksook Bay"
      ,Code:"OOK"
    },
    {
       Country:" Japan "
      ,City:"Tokunoshima"
      ,Code:"TKN"
    },
    {
       Country:" Japan "
      ,City:"Tokushima"
      ,Code:"TKS"
    },
    {
       Country:" Japan - All airports "
      ,City:"Tokyo"
      ,Code:"TYO"
    },
    {
       Country:" Japan - Haneda "
      ,City:"Tokyo"
      ,Code:"HND"
    },
    {
       Country:" Japan - Narita "
      ,City:"Tokyo"
      ,Code:"NRT"
    },
    {
       Country:" OH "
      ,City:"Toledo"
      ,Code:"TOL"
    },
    {
       Country:" Brazil "
      ,City:"Toledo"
      ,Code:"TOW"
    },
    {
       Country:" Mexico "
      ,City:"Toluco"
      ,Code:"TLC"
    },
    {
       Country:" Australia "
      ,City:"Tom Price"
      ,Code:"TPR"
    },
    {
       Country:" Malaysia "
      ,City:"Tomanggong"
      ,Code:"TMG"
    },
    {
       Country:" Mali "
      ,City:"Tombouctou"
      ,Code:"TOM"
    },
    {
       Country:" Russia "
      ,City:"Tomsk"
      ,Code:"TOF"
    },
    {
       Country:" China "
      ,City:"Tongliao"
      ,Code:"TGO"
    },
    {
       Country:" Vanuatu "
      ,City:"Tongoa"
      ,Code:"TGH"
    },
    {
       Country:" Australia"
      ,City:"Toowoomba"
      ,Code:"TWB"
    },
    {
       Country:" KS "
      ,City:"Topeka"
      ,Code:"FOE"
    },
    {
       Country:" ON - Downtown Rail service "
      ,City:"Toronto"
      ,Code:"YBZ"
    },
    {
       Country:" ON - Guildwood Rail service "
      ,City:"Toronto"
      ,Code:"XLQ"
    },
    {
       Country:" ON - International "
      ,City:"Toronto"
      ,Code:"YYZ"
    },
    {
       Country:" ON - Toronto Island Airport "
      ,City:"Toronto"
      ,Code:"YTZ"
    },
    {
       Country:" Norway - Sandefjord "
      ,City:"Torp Airport Oslo"
      ,Code:"TRF"
    },
    {
       Country:" Mexico "
      ,City:"Torreon"
      ,Code:"TRC"
    },
    {
       Country:" Vanuatu "
      ,City:"Torres"
      ,Code:"TOH"
    },
    {
       Country:" Sweden "
      ,City:"Torsby"
      ,Code:"TYF"
    },
    {
       Country:" British Virgin Islands "
      ,City:"Tortola"
      ,Code:"TOV"
    },
    {
       Country:" Italy "
      ,City:"Tortoli"
      ,Code:"TTB"
    },
    {
       Country:" Costa Rica "
      ,City:"Tortuquero"
      ,Code:"TTQ"
    },
    {
       Country:" Japan "
      ,City:"Tottori"
      ,Code:"TTJ"
    },
    {
       Country:" New Caledonia "
      ,City:"Touho"
      ,Code:"TOU"
    },
    {
       Country:" France "
      ,City:"Toulon"
      ,Code:"TLN"
    },
    {
       Country:" France "
      ,City:"Toulouse"
      ,Code:"TLS"
    },
    {
       Country:" France "
      ,City:"Tours"
      ,Code:"TUF"
    },
    {
       Country:" France - Rail service "
      ,City:"Tours"
      ,Code:"XSH"
    },
    {
       Country:" Australia"
      ,City:"Townsville"
      ,Code:"TSV"
    },
    {
       Country:" Japan "
      ,City:"Toyama"
      ,Code:"TOY"
    },
    {
       Country:" Tunisia "
      ,City:"Tozeur"
      ,Code:"TOE"
    },
    {
       Country:" Turkey "
      ,City:"Trabzon"
      ,Code:"TZX"
    },
    {
       Country:" Thailand "
      ,City:"Trang"
      ,Code:"TST"
    },
    {
       Country:" Italy "
      ,City:"Trapani"
      ,Code:"TPS"
    },
    {
       Country:" Australia "
      ,City:"Traralgon"
      ,Code:"TGN"
    },
    {
       Country:" MI "
      ,City:"Traverse City"
      ,Code:"TVC"
    },
    {
       Country:" Bahamas "
      ,City:"Treasure Cay"
      ,Code:"TCB"
    },
    {
       Country:" Argentina "
      ,City:"Trelew"
      ,Code:"REL"
    },
    {
       Country:" NJ "
      ,City:"Trenton/Mercer"
      ,Code:"TTN"
    },
    {
       Country:" Italy "
      ,City:"Trieste"
      ,Code:"TRS"
    },
    {
       Country:" Bolivia "
      ,City:"Trinidad"
      ,Code:"TDD"
    },
    {
       Country:" Trinidad and Tobago "
      ,City:"Trinidad"
      ,Code:"POS"
    },
    {
       Country:" Libya "
      ,City:"Tripoli"
      ,Code:"TIP"
    },
    {
       Country:" Sweden "
      ,City:"Trollhattan"
      ,Code:"THN"
    },
    {
       Country:" Brazil "
      ,City:"Trombetas"
      ,Code:"TMT"
    },
    {
       Country:" Norway "
      ,City:"Tromso"
      ,Code:"TOS"
    },
    {
       Country:" Norway "
      ,City:"Trondheim"
      ,Code:"TRD"
    },
    {
       Country:" Honduras "
      ,City:"Trujillo"
      ,Code:"TJI"
    },
    {
       Country:" Peru "
      ,City:"Trujillo"
      ,Code:"TRU"
    },
    {
       Country:" Micronesia "
      ,City:"Truk"
      ,Code:"TKK"
    },
    {
       Country:" NS - Rail service "
      ,City:"Truro"
      ,Code:"XLZ"
    },
    {
       Country:" Madagascar "
      ,City:"Tsaratanana"
      ,Code:"TTS"
    },
    {
       Country:" Madagascar "
      ,City:"Tsiroanomandidy"
      ,Code:"WTS"
    },
    {
       Country:" Namibia "
      ,City:"Tsumeb"
      ,Code:"TSB"
    },
    {
       Country:" Japan "
      ,City:"Tsushima"
      ,Code:"TSJ"
    },
    {
       Country:" French Polynesia "
      ,City:"Tubuai"
      ,Code:"TUB"
    },
    {
       Country:" AZ "
      ,City:"Tucson"
      ,Code:"TUS"
    },
    {
       Country:" Argentina "
      ,City:"Tucuman"
      ,Code:"TUC"
    },
    {
       Country:" Venezuela "
      ,City:"Tucupita"
      ,Code:"TUV"
    },
    {
       Country:" Brazil "
      ,City:"Tucurui"
      ,Code:"TUR"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Tufi"
      ,Code:"TFI"
    },
    {
       Country:" Philippines "
      ,City:"Tuguegarao"
      ,Code:"TUG"
    },
    {
       Country:" NT "
      ,City:"Tuktoyaktuk"
      ,Code:"YUB"
    },
    {
       Country:" Ecuador "
      ,City:"Tulcan"
      ,Code:"TUA"
    },
    {
       Country:" Madagascar "
      ,City:"Tulear"
      ,Code:"TLE"
    },
    {
       Country:" NT "
      ,City:"Tulita/Fort Norman"
      ,Code:"ZFN"
    },
    {
       Country:" OK "
      ,City:"Tulsa"
      ,Code:"TUL"
    },
    {
       Country:" AK "
      ,City:"Tuluksak"
      ,Code:"TLT"
    },
    {
       Country:" Ethiopia "
      ,City:"Tum"
      ,Code:"TUJ"
    },
    {
       Country:" Colombia "
      ,City:"Tumaco"
      ,Code:"TCO"
    },
    {
       Country:" Peru "
      ,City:"Tumbes"
      ,Code:"TBP"
    },
    {
       Country:" Tunisia "
      ,City:"Tunis"
      ,Code:"TUN"
    },
    {
       Country:" AK "
      ,City:"Tuntutuliak"
      ,Code:"WTL"
    },
    {
       Country:" AK "
      ,City:"Tununak"
      ,Code:"TNK"
    },
    {
       Country:" China "
      ,City:"Tunxi"
      ,Code:"TXN"
    },
    {
       Country:" MS "
      ,City:"Tupelo"
      ,Code:"TUP"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Turaif"
      ,Code:"TUI"
    },
    {
       Country:" Pakistan "
      ,City:"Turbat"
      ,Code:"TUK"
    },
    {
       Country:" Italy "
      ,City:"Turin"
      ,Code:"TRN"
    },
    {
       Country:" Finland "
      ,City:"Turku"
      ,Code:"TKU"
    },
    {
       Country:" AL "
      ,City:"Tuscaloosa"
      ,Code:"TCL"
    },
    {
       Country:" Mexico "
      ,City:"Tuxtla Gutierrez"
      ,Code:"TGZ"
    },
    {
       Country:" ID "
      ,City:"Twin Falls"
      ,Code:"TWF"
    },
    {
       Country:" AK "
      ,City:"Twin Hills"
      ,Code:"TWA"
    },
    {
       Country:" TX "
      ,City:"Tyler"
      ,Code:"TYR"
    },
    {
       Country:" Russia "
      ,City:"Tyumen"
      ,Code:"TJM"
    },
    {
       Country:" Japan "
      ,City:"Ube"
      ,Code:"UBJ"
    },
    {
       Country:" Brazil "
      ,City:"Uberaba"
      ,Code:"UBA"
    },
    {
       Country:" Brazil "
      ,City:"Uberlandia"
      ,Code:"UDI"
    },
    {
       Country:" Thailand "
      ,City:"Ubon Ratchathani"
      ,Code:"UBP"
    },
    {
       Country:" India "
      ,City:"Udaipur"
      ,Code:"UDR"
    },
    {
       Country:" Thailand "
      ,City:"Udon Thani"
      ,Code:"UTH"
    },
    {
       Country:" Russia "
      ,City:"Ufa"
      ,Code:"UFA"
    },
    {
       Country:" Marshall Islands "
      ,City:"Ujae Island"
      ,Code:"UJE"
    },
    {
       Country:" Indonesia "
      ,City:"Ujung Pandang"
      ,Code:"UPG"
    },
    {
       Country:" Russia "
      ,City:"Ukhta"
      ,Code:"UCT"
    },
    {
       Country:" Mongolia "
      ,City:"Ulaanbaatar"
      ,Code:"ULN"
    },
    {
       Country:" China "
      ,City:"Ulanhot"
      ,Code:"HLH"
    },
    {
       Country:" Russia "
      ,City:"Ulan-Ude"
      ,Code:"UUD"
    },
    {
       Country:" Vanuatu "
      ,City:"Ulei"
      ,Code:"ULB"
    },
    {
       Country:" Mongolia "
      ,City:"Uliastai"
      ,Code:"ULY"
    },
    {
       Country:" Micronesia "
      ,City:"Ulithi"
      ,Code:"ULI"
    },
    {
       Country:" South Korea "
      ,City:"Ulsan"
      ,Code:"USN"
    },
    {
       Country:" South Africa "
      ,City:"Ulundi"
      ,Code:"ULD"
    },
    {
       Country:" Sweden "
      ,City:"Umea"
      ,Code:"UME"
    },
    {
       Country:" QC "
      ,City:"Umiujag"
      ,Code:"YUD"
    },
    {
       Country:" South Africa "
      ,City:"Umtata"
      ,Code:"UTT"
    },
    {
       Country:" AK "
      ,City:"Unalakleet"
      ,Code:"UNK"
    },
    {
       Country:" Greenland "
      ,City:"Upernavik"
      ,Code:"JUV"
    },
    {
       Country:" South Africa "
      ,City:"Upington"
      ,Code:"UTN"
    },
    {
       Country:" Russia "
      ,City:"Uraj"
      ,Code:"URJ"
    },
    {
       Country:" Kazakhstan "
      ,City:"Uralsk"
      ,Code:"URA"
    },
    {
       Country:" SK "
      ,City:"Uranium City"
      ,Code:"YBE"
    },
    {
       Country:" IL "
      ,City:"Urbana/Champaign"
      ,Code:"CMI"
    },
    {
       Country:" Uzbekistan "
      ,City:"Urgench"
      ,Code:"UGC"
    },
    {
       Country:" Iran "
      ,City:"Urmieh"
      ,Code:"OMH"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Uroubi"
      ,Code:"URU"
    },
    {
       Country:" Mexico "
      ,City:"Uruapan"
      ,Code:"UPN"
    },
    {
       Country:" Brazil "
      ,City:"Uruguaiana"
      ,Code:"URG"
    },
    {
       Country:" China "
      ,City:"Urumqi"
      ,Code:"URC"
    },
    {
       Country:" Australia "
      ,City:"Useless Loop"
      ,Code:"USL"
    },
    {
       Country:" Argentina "
      ,City:"Ushuaia"
      ,Code:"USH"
    },
    {
       Country:" Russia "
      ,City:"Usinsk"
      ,Code:"USK"
    },
    {
       Country:" Russia "
      ,City:"Ust-Ilimsk"
      ,Code:"UIK"
    },
    {
       Country:" Kazakhstan "
      ,City:"Ust-Kamenogorsk"
      ,Code:"UKK"
    },
    {
       Country:" Thailand "
      ,City:"Utapao"
      ,Code:"UTP"
    },
    {
       Country:" NY "
      ,City:"Utica"
      ,Code:"UCA"
    },
    {
       Country:" Honduras "
      ,City:"Utila"
      ,Code:"UII"
    },
    {
       Country:" Marshall Islands "
      ,City:"Utirik Island"
      ,Code:"UTK"
    },
    {
       Country:" AK "
      ,City:"Utopia Creek"
      ,Code:"UTO"
    },
    {
       Country:" Greeland "
      ,City:"Uummannaq"
      ,Code:"UMD"
    },
    {
       Country:" Ukraine "
      ,City:"Uzhgorod"
      ,Code:"UDJ"
    },
    {
       Country:" Antigua & Barbuda "
      ,City:"V.C. Bird International"
      ,Code:"ANU"
    },
    {
       Country:" Finland "
      ,City:"Vaasa"
      ,Code:"VAA"
    },
    {
       Country:" India "
      ,City:"Vadodara"
      ,Code:"BDQ"
    },
    {
       Country:" Norway "
      ,City:"Vadso"
      ,Code:"VDS"
    },
    {
       Country:" CO - Eagle County Airport "
      ,City:"Vail"
      ,Code:"EGE"
    },
    {
       Country:" CO - Van service "
      ,City:"Vail"
      ,Code:"QBF"
    },
    {
       Country:" AK "
      ,City:"Valdez"
      ,Code:"VDZ"
    },
    {
       Country:" Chile "
      ,City:"Valdivia"
      ,Code:"ZAL"
    },
    {
       Country:" QC "
      ,City:"Val-d'Or"
      ,Code:"YVO"
    },
    {
       Country:" GA "
      ,City:"Valdosta"
      ,Code:"VLD"
    },
    {
       Country:" Spain "
      ,City:"Valencia"
      ,Code:"VLC"
    },
    {
       Country:" Venezuela "
      ,City:"Valencia"
      ,Code:"VLN"
    },
    {
       Country:" France "
      ,City:"Valenciennes"
      ,Code:"XVS"
    },
    {
       Country:" Venezuela "
      ,City:"Valera"
      ,Code:"VLV"
    },
    {
       Country:" Vanuatu "
      ,City:"Valesdir"
      ,Code:"VLS"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Valladolid"
      ,Code:"VLL"
    },
    {
       Country:" Colombia "
      ,City:"Valledupar"
      ,Code:"VUP"
    },
    {
       Country:" FL "
      ,City:"Valparaiso"
      ,Code:"VPS"
    },
    {
       Country:" Spain and Canary Islands - Hierro "
      ,City:"Valverde"
      ,Code:"VDE"
    },
    {
       Country:" Turkey "
      ,City:"Van"
      ,Code:"VAN"
    },
    {
       Country:" BC "
      ,City:"Vancouver"
      ,Code:"YVR"
    },
    {
       Country:" BC - Coal Harbour "
      ,City:"Vancouver"
      ,Code:"CXH"
    },
    {
       Country:" BC - International "
      ,City:"Vancouver"
      ,Code:"YVR"
    },
    {
       Country:" BC - Rail service "
      ,City:"Vancouver"
      ,Code:"XEA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Vanimo"
      ,Code:"VAI"
    },
    {
       Country:" Fiji "
      ,City:"Vanuabalavu"
      ,Code:"VBV"
    },
    {
       Country:" Cuba "
      ,City:"Varadero"
      ,Code:"VRA"
    },
    {
       Country:" India "
      ,City:"Varanasi"
      ,Code:"VNS"
    },
    {
       Country:" Norway "
      ,City:"Vardoe"
      ,Code:"VAW"
    },
    {
       Country:" Brazil "
      ,City:"Varginha"
      ,Code:"VAG"
    },
    {
       Country:" Finland "
      ,City:"Varkaus"
      ,Code:"VRK"
    },
    {
       Country:" Bulgaria "
      ,City:"Varna"
      ,Code:"VAR"
    },
    {
       Country:" Sweden "
      ,City:"Vasteras"
      ,Code:"VST"
    },
    {
       Country:" Madagascar "
      ,City:"Vatomatry"
      ,Code:"VAT"
    },
    {
       Country:" Tonga "
      ,City:"Vava'u"
      ,Code:"VAV"
    },
    {
       Country:" Sweden "
      ,City:"Vaxjo"
      ,Code:"VXO"
    },
    {
       Country:" AK "
      ,City:"Venetie"
      ,Code:"VEE"
    },
    {
       Country:" Italy - Marco Polo "
      ,City:"Venice"
      ,Code:"VCE"
    },
    {
       Country:" Italy - Treviso "
      ,City:"Venice"
      ,Code:"TSF"
    },
    {
       Country:" CA "
      ,City:"Ventura/Oxnard"
      ,Code:"OXR"
    },
    {
       Country:" Mexico "
      ,City:"Veracruz"
      ,Code:"VER"
    },
    {
       Country:" UT "
      ,City:"Vernal"
      ,Code:"VEL"
    },
    {
       Country:" Italy "
      ,City:"Verona"
      ,Code:"VRN"
    },
    {
       Country:" Iceland "
      ,City:"Vestmannaeyjar"
      ,Code:"VEY"
    },
    {
       Country:" Zimbabwe "
      ,City:"Victoria Falls"
      ,Code:"VFA"
    },
    {
       Country:" Australia "
      ,City:"Victoria River Downs"
      ,Code:"VCD"
    },
    {
       Country:" BC - Inner Harbor "
      ,City:"Victoria"
      ,Code:"YWH"
    },
    {
       Country:" BC - International "
      ,City:"Victoria"
      ,Code:"YYJ"
    },
    {
       Country:" TX "
      ,City:"Victoria"
      ,Code:"VCT"
    },
    {
       Country:" Argentina "
      ,City:"Viedma"
      ,Code:"VDM"
    },
    {
       Country:" Austria "
      ,City:"Vienna"
      ,Code:"VIE"
    },
    {
       Country:" Laos - Wattay "
      ,City:"Vientiane"
      ,Code:"VTE"
    },
    {
       Country:" Puerto Rico "
      ,City:"Vieques"
      ,Code:"VQS"
    },
    {
       Country:" Spain "
      ,City:"Vigo"
      ,Code:"VGO"
    },
    {
       Country:" Mozambique "
      ,City:"Vilanculos"
      ,Code:"VNX"
    },
    {
       Country:" Sweden "
      ,City:"Vilhelmina"
      ,Code:"VHM"
    },
    {
       Country:" Brazil "
      ,City:"Vilhena"
      ,Code:"BVH"
    },
    {
       Country:" Argentina "
      ,City:"Villa Gesell"
      ,Code:"VLG"
    },
    {
       Country:" Argentina "
      ,City:"Villa Mercedes"
      ,Code:"VME"
    },
    {
       Country:" Mexico "
      ,City:"Villahermosa"
      ,Code:"VSA"
    },
    {
       Country:" Lithuania "
      ,City:"Vilnius"
      ,Code:"VNO"
    },
    {
       Country:" Viet Nam "
      ,City:"Vinh City"
      ,Code:"VII"
    },
    {
       Country:" British Virgin Islands "
      ,City:"Virgin Gorda"
      ,Code:"VIJ"
    },
    {
       Country:" CA "
      ,City:"Visalia"
      ,Code:"VIS"
    },
    {
       Country:" Sweden "
      ,City:"Visby"
      ,Code:"VBY"
    },
    {
       Country:" India "
      ,City:"Vishakhapatnam"
      ,Code:"VTZ"
    },
    {
       Country:" Belarus "
      ,City:"Vitebsk"
      ,Code:"VTB"
    },
    {
       Country:" BA"
      ,City:"Vitoria da Conquista"
      ,Code:"VDC"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Vitoria"
      ,Code:"VIT"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Vivigani"
      ,Code:"VIV"
    },
    {
       Country:" Russia "
      ,City:"Vladikavkaz"
      ,Code:"OGZ"
    },
    {
       Country:" Russia "
      ,City:"Vladivostok"
      ,Code:"VVO"
    },
    {
       Country:" Madagascar "
      ,City:"Vohemar"
      ,Code:"VOH"
    },
    {
       Country:" Russia "
      ,City:"Volgodonsk"
      ,Code:"VLK"
    },
    {
       Country:" Russia "
      ,City:"Volgograd"
      ,Code:"VOG"
    },
    {
       Country:" Iceland "
      ,City:"Vopnafjordur"
      ,Code:"VPN"
    },
    {
       Country:" Russia "
      ,City:"Vorkuta"
      ,Code:"VKT"
    },
    {
       Country:" Russia "
      ,City:"Voronezh"
      ,Code:"VOZ"
    },
    {
       Country:" NL "
      ,City:"Wabush"
      ,Code:"YWK"
    },
    {
       Country:" TX "
      ,City:"Waco"
      ,Code:"ACT"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Wadi Ad Dawasir"
      ,Code:"WAE"
    },
    {
       Country:" Sudan "
      ,City:"Wadi Halfa"
      ,Code:"WHF"
    },
    {
       Country:" Indonesia "
      ,City:"Wagethe"
      ,Code:"WET"
    },
    {
       Country:" Australia "
      ,City:"Wagga Wagga"
      ,Code:"WGA"
    },
    {
       Country:" Indonesia "
      ,City:"Wahai"
      ,Code:"WBA"
    },
    {
       Country:" Indonesia "
      ,City:"Waingapo"
      ,Code:"WGP"
    },
    {
       Country:" AK "
      ,City:"Wainwright"
      ,Code:"AIN"
    },
    {
       Country:" Japan "
      ,City:"Wakkanai"
      ,Code:"WKJ"
    },
    {
       Country:" Vanuatu "
      ,City:"Walaha"
      ,Code:"WLH"
    },
    {
       Country:" AK "
      ,City:"Wales"
      ,Code:"WAA"
    },
    {
       Country:" Australia "
      ,City:"Walgett"
      ,Code:"WGE"
    },
    {
       Country:" WA "
      ,City:"Walla Walla"
      ,Code:"ALW"
    },
    {
       Country:" Wallis and Futuna Islands "
      ,City:"Wallis Island"
      ,Code:"WLS"
    },
    {
       Country:" Namibia "
      ,City:"Walvis Bay"
      ,Code:"WVB"
    },
    {
       Country:" Indonesia "
      ,City:"Wamena"
      ,Code:"WMX"
    },
    {
       Country:" New Zealand "
      ,City:"Wanaka"
      ,Code:"WKA"
    },
    {
       Country:" New Zealand "
      ,City:"Wanganui"
      ,Code:"WAG"
    },
    {
       Country:" Germany "
      ,City:"Wangerooge"
      ,Code:"AGE"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Wanigela"
      ,Code:"AGL"
    },
    {
       Country:" China "
      ,City:"Wanxian"
      ,Code:"WXN"
    },
    {
       Country:" Poland "
      ,City:"Warsaw"
      ,Code:"WAW"
    },
    {
       Country:""
      ,City:"Washington DC - All airports "
      ,Code:"WAS"
    },
    {
       Country:""
      ,City:"Washington DC - Dulles "
      ,Code:"IAD"
    },
    {
       Country:""
      ,City:"Washington DC - National "
      ,Code:"DCA"
    },
    {
       Country:" Indonesia "
      ,City:"Wasior"
      ,Code:"WSR"
    },
    {
       Country:" QC "
      ,City:"Waskaganish"
      ,Code:"YKQ"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Wasu"
      ,Code:"WSU"
    },
    {
       Country:" AK "
      ,City:"Waterfall"
      ,Code:"KWF"
    },
    {
       Country:" Ireland "
      ,City:"Waterford"
      ,Code:"WAT"
    },
    {
       Country:" IA "
      ,City:"Waterloo"
      ,Code:"ALO"
    },
    {
       Country:" NY "
      ,City:"Watertown"
      ,Code:"ART"
    },
    {
       Country:" SD "
      ,City:"Watertown"
      ,Code:"ATY"
    },
    {
       Country:" ON - Rail service "
      ,City:"Watford"
      ,Code:"XWA"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Wau"
      ,Code:"WUG"
    },
    {
       Country:" Sudan "
      ,City:"Wau"
      ,Code:"WUU"
    },
    {
       Country:" WI "
      ,City:"Wausau/Stevens Point"
      ,Code:"CWA"
    },
    {
       Country:" ON "
      ,City:"Webequie"
      ,Code:"YWP"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Wedau"
      ,Code:"WED"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Wedjh"
      ,Code:"EJH"
    },
    {
       Country:" China "
      ,City:"Weihai"
      ,Code:"WEH"
    },
    {
       Country:" Australia"
      ,City:"Weipa"
      ,Code:"WEI"
    },
    {
       Country:" New Zealand "
      ,City:"Wellington"
      ,Code:"WLG"
    },
    {
       Country:" QC "
      ,City:"Wemindji"
      ,Code:"YNC"
    },
    {
       Country:" WA "
      ,City:"Wenatchee"
      ,Code:"EAT"
    },
    {
       Country:" China "
      ,City:"Wenzhou"
      ,Code:"WNZ"
    },
    {
       Country:" FL "
      ,City:"West Palm Beach"
      ,Code:"PBI"
    },
    {
       Country:" MT "
      ,City:"West Yellowstone"
      ,Code:"WYS"
    },
    {
       Country:" NY "
      ,City:"Westchester County"
      ,Code:"HPN"
    },
    {
       Country:" Germany "
      ,City:"Westerland"
      ,Code:"GWT"
    },
    {
       Country:" RI "
      ,City:"Westerly"
      ,Code:"WST"
    },
    {
       Country:" New Zealand "
      ,City:"Westport"
      ,Code:"WSZ"
    },
    {
       Country:" United Kingdom "
      ,City:"Westray"
      ,Code:"WRY"
    },
    {
       Country:" WA "
      ,City:"Westsound"
      ,Code:"WSX"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Wewak"
      ,Code:"WWK"
    },
    {
       Country:" QC - Rail service "
      ,City:"Weymont"
      ,Code:"XFQ"
    },
    {
       Country:" NT "
      ,City:"Wha Ti/Lac La Martre"
      ,Code:"YLE"
    },
    {
       Country:" New Zealand "
      ,City:"Whakatane"
      ,Code:"WHK"
    },
    {
       Country:" NU "
      ,City:"Whale Cove"
      ,Code:"YXN"
    },
    {
       Country:" AK "
      ,City:"Whale Pass"
      ,Code:"WWP"
    },
    {
       Country:" New Zealand "
      ,City:"Whangarei"
      ,Code:"WRE"
    },
    {
       Country:" AK "
      ,City:"White Mountain"
      ,Code:"WMO"
    },
    {
       Country:" ON "
      ,City:"White River"
      ,Code:"YWR"
    },
    {
       Country:" VT "
      ,City:"White River"
      ,Code:"LEB"
    },
    {
       Country:" YT "
      ,City:"Whitehorse"
      ,Code:"YXY"
    },
    {
       Country:" Australia "
      ,City:"Whyalla"
      ,Code:"WYA"
    },
    {
       Country:" TX "
      ,City:"Wichita Falls"
      ,Code:"SPS"
    },
    {
       Country:" KS "
      ,City:"Wichita"
      ,Code:"ICT"
    },
    {
       Country:" United Kingdom "
      ,City:"Wick"
      ,Code:"WIC"
    },
    {
       Country:" Germany "
      ,City:"Wilhelmshaven"
      ,Code:"WVN"
    },
    {
       Country:" PA "
      ,City:"Wilkes Barre"
      ,Code:"AVP"
    },
    {
       Country:" NL "
      ,City:"Williams Harbour"
      ,Code:"YWM"
    },
    {
       Country:" BC "
      ,City:"Williams Lake"
      ,Code:"YWL"
    },
    {
       Country:" VA "
      ,City:"Williamsburg"
      ,Code:"PHF"
    },
    {
       Country:" PA "
      ,City:"Williamsport"
      ,Code:"IPT"
    },
    {
       Country:" ND "
      ,City:"Williston"
      ,Code:"ISN"
    },
    {
       Country:" NC "
      ,City:"Wilmington"
      ,Code:"ILM"
    },
    {
       Country:" Australia "
      ,City:"Wiluna"
      ,Code:"WUN"
    },
    {
       Country:" Australia"
      ,City:"Windarra"
      ,Code:"WNR"
    },
    {
       Country:" CT "
      ,City:"Windsor Locks"
      ,Code:"BDL"
    },
    {
       Country:" ON "
      ,City:"Windsor"
      ,Code:"YQG"
    },
    {
       Country:" ON - Rail service "
      ,City:"Windsor"
      ,Code:"XEC"
    },
    {
       Country:" MB - International "
      ,City:"Winnipeg"
      ,Code:"YWG"
    },
    {
       Country:" MB - Rail service "
      ,City:"Winnipeg"
      ,Code:"XEF"
    },
    {
       Country:" Australia"
      ,City:"Winton"
      ,Code:"WIN"
    },
    {
       Country:" Marshall Islands "
      ,City:"Woja"
      ,Code:"WJA"
    },
    {
       Country:" SK "
      ,City:"Wollaston Lake"
      ,Code:"ZWL"
    },
    {
       Country:" Taiwan "
      ,City:"Wonan"
      ,Code:"WOT"
    },
    {
       Country:" South Korea "
      ,City:"WonJu"
      ,Code:"WJU"
    },
    {
       Country:" ON - Rail service "
      ,City:"Woodstock"
      ,Code:"XIP"
    },
    {
       Country:" MA "
      ,City:"Worcester"
      ,Code:"ORH"
    },
    {
       Country:" WY "
      ,City:"Worland"
      ,Code:"WRL"
    },
    {
       Country:" Marshall Islands "
      ,City:"Wotho Island"
      ,Code:"WTO"
    },
    {
       Country:" Marshall Islands "
      ,City:"Wotje Island"
      ,Code:"WTE"
    },
    {
       Country:" AK "
      ,City:"Wrangell"
      ,Code:"WRG"
    },
    {
       Country:" Poland "
      ,City:"Wroclaw"
      ,Code:"WRO"
    },
    {
       Country:" Australia "
      ,City:"Wudinna"
      ,Code:"WUD"
    },
    {
       Country:" China "
      ,City:"Wuhan"
      ,Code:"WUH"
    },
    {
       Country:" ON "
      ,City:"Wunnummin Lake"
      ,Code:"WNN"
    },
    {
       Country:" China "
      ,City:"Wuyishan"
      ,Code:"WUS"
    },
    {
       Country:" Australia "
      ,City:"Wyndham"
      ,Code:"WYN"
    },
    {
       Country:" ON - Rail service "
      ,City:"Wyoming"
      ,Code:"XWY"
    },
    {
       Country:" China - Xianyang "
      ,City:"Xi An"
      ,Code:"XIY"
    },
    {
       Country:" China "
      ,City:"Xiamen"
      ,Code:"XMN"
    },
    {
       Country:" China "
      ,City:"Xiangfan"
      ,Code:"XFN"
    },
    {
       Country:" China "
      ,City:"Xichang"
      ,Code:"XIC"
    },
    {
       Country:" Laos "
      ,City:"Xieng Khouang"
      ,Code:"XKH"
    },
    {
       Country:" China "
      ,City:"Xilinhot"
      ,Code:"XIL"
    },
    {
       Country:" China "
      ,City:"Xining"
      ,Code:"XNN"
    },
    {
       Country:" China "
      ,City:"Xuzhou"
      ,Code:"XUZ"
    },
    {
       Country:" WA "
      ,City:"Yakima"
      ,Code:"YKM"
    },
    {
       Country:" AK "
      ,City:"Yakutat"
      ,Code:"YAK"
    },
    {
       Country:" Russia "
      ,City:"Yakutsk"
      ,Code:"YKS"
    },
    {
       Country:" Papua New Guinea "
      ,City:"Yalumet"
      ,Code:"KYX"
    },
    {
       Country:" Australia"
      ,City:"Yam Island"
      ,Code:"XMY"
    },
    {
       Country:" Japan "
      ,City:"Yamagata"
      ,Code:"GAJ"
    },
    {
       Country:" China "
      ,City:"Yan'an"
      ,Code:"ENY"
    },
    {
       Country:" Saudi Arabia "
      ,City:"Yanbu"
      ,Code:"YNB"
    },
    {
       Country:" China "
      ,City:"Yancheng"
      ,Code:"YNZ"
    },
    {
       Country:" Solomon Islands "
      ,City:"Yandina"
      ,Code:"XYA"
    },
    {
       Country:" Myanmar "
      ,City:"Yangon"
      ,Code:"RGN"
    },
    {
       Country:" China "
      ,City:"Yanji"
      ,Code:"YNJ"
    },
    {
       Country:" China "
      ,City:"Yantai"
      ,Code:"YNT"
    },
    {
       Country:" Cameroon "
      ,City:"Yaounde"
      ,Code:"YAO"
    },
    {
       Country:" Micronesia "
      ,City:"Yap"
      ,Code:"YAP"
    },
    {
       Country:" NS "
      ,City:"Yarmouth"
      ,Code:"YQI"
    },
    {
       Country:" Russia "
      ,City:"Yaroslavl"
      ,Code:"IAR"
    },
    {
       Country:" Iran "
      ,City:"Yazd"
      ,Code:"AZD"
    },
    {
       Country:" Mali "
      ,City:"Yelimane"
      ,Code:"EYL"
    },
    {
       Country:" NT "
      ,City:"Yellowknife"
      ,Code:"YZF"
    },
    {
       Country:" WY "
      ,City:"Yellowstone/Cody"
      ,Code:"COD"
    },
    {
       Country:" South Korea "
      ,City:"Yeosu"
      ,Code:"RSU"
    },
    {
       Country:" Armenia "
      ,City:"Yerevan"
      ,Code:"EVN"
    },
    {
       Country:" China "
      ,City:"Yibin"
      ,Code:"YBP"
    },
    {
       Country:" China "
      ,City:"Yichang"
      ,Code:"YIH"
    },
    {
       Country:" China "
      ,City:"Yinchuan"
      ,Code:"INC"
    },
    {
       Country:" China "
      ,City:"Yining"
      ,Code:"YIN"
    },
    {
       Country:" China "
      ,City:"Yiwu"
      ,Code:"YIW"
    },
    {
       Country:" Indonesia "
      ,City:"Yogyakarta"
      ,Code:"JOG"
    },
    {
       Country:" Japan "
      ,City:"Yonago"
      ,Code:"YGJ"
    },
    {
       Country:" Japan "
      ,City:"Yonaguni Jima"
      ,Code:"OGN"
    },
    {
       Country:" MB "
      ,City:"York Landing"
      ,Code:"ZAC"
    },
    {
       Country:" Australia"
      ,City:"Yorke Island"
      ,Code:"OKR"
    },
    {
       Country:" Japan "
      ,City:"Yoronjima"
      ,Code:"RNJ"
    },
    {
       Country:" OH "
      ,City:"Youngstown"
      ,Code:"YNG"
    },
    {
       Country:" China "
      ,City:"Yulin"
      ,Code:"UYN"
    },
    {
       Country:" AZ "
      ,City:"Yuma"
      ,Code:"YUM"
    },
    {
       Country:" Russia "
      ,City:"Yuzhno-Sakhalinsk"
      ,Code:"UUS"
    },
    {
       Country:" Croatia "
      ,City:"Zadar"
      ,Code:"ZAD"
    },
    {
       Country:" Croatia "
      ,City:"Zagreb"
      ,Code:"ZAG"
    },
    {
       Country:" Iran "
      ,City:"Zahedan"
      ,Code:"ZAH"
    },
    {
       Country:" Greece "
      ,City:"Zakinthos Island"
      ,Code:"ZTH"
    },
    {
       Country:" Philippines "
      ,City:"Zamboanga"
      ,Code:"ZAM"
    },
    {
       Country:" Tanzania - Kisauni "
      ,City:"Zanzibar"
      ,Code:"ZNZ"
    },
    {
       Country:" Ukraine "
      ,City:"Zaporozhye"
      ,Code:"OZH"
    },
    {
       Country:" Spain and Canary Islands "
      ,City:"Zaragoza"
      ,Code:"ZAZ"
    },
    {
       Country:" China "
      ,City:"Zhanjiang"
      ,Code:"ZHA"
    },
    {
       Country:" China "
      ,City:"Zhaotong"
      ,Code:"ZAT"
    },
    {
       Country:" China "
      ,City:"Zhengzha"
      ,Code:"CGO"
    },
    {
       Country:" Pakistan "
      ,City:"Zhob"
      ,Code:"PZH"
    },
    {
       Country:" China "
      ,City:"Zhoushan"
      ,Code:"HSN"
    },
    {
       Country:" China "
      ,City:"Zhuhai"
      ,Code:"ZUH"
    },
    {
       Country:" Poland "
      ,City:"Zielana"
      ,Code:"IEG"
    },
    {
       Country:" Mexico "
      ,City:"Zihuatanejo/Ixtapa"
      ,Code:"ZIH"
    },
    {
       Country:" Mauritania "
      ,City:"Zouerate"
      ,Code:"OUZ"
    },
    {
       Country:" Indonesia "
      ,City:"Zugapa"
      ,Code:"UGU"
    },
    {
       Country:" Switzerland "
      ,City:"Zurich"
      ,Code:"ZRH"
    }]

    