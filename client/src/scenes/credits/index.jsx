import { Box,useTheme,Typography, Button } from "@mui/material";
import NavBar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import Footer from "scenes/footer";



const Credits = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();

  return <>
  <NavBar/>
  <Box>
    <Typography variant="h1" width={'100%'} mt={'30px'}> Special Thank For : </Typography>
      <ul style={{display:'flex' , justifyContent:'center', flexWrap:'wrap', listStyle:'none'}}> 
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@lvnatikk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Lily Banse</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/-YHSwy6uqvk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@jaywennington?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jay Wennington</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/N_Y88TWmGwA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@piratastudiofilm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pirata Studio Film</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/qt6b5042lrw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@jordipbu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">jordi pujadas</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/_uUcx36lwVo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@igcorreia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ignacio Correia 🟢</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/1zayQPT4Xzk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@profwicks?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ben Wicks</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/-UgrmeAC06E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@sserass?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">sera</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/iZgQKxuMRHc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@snoopyhappy25?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Harper Nguyen</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/j6DH45Bflho?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@haseebjkhan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Haseeb Jamil</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/J9lD6FS6_cs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@xz051571t?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Janice Lin</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/yUIN4QWKCTw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
        <li style={{width:'100%', textAlign:'center', fontSize:'18px'}}>Photo de <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/@mealontheplate?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Melissia Ohol</a> sur <a style={{textDecoration:'none', color : palette.primary.main}} href="https://unsplash.com/fr/photos/7dhnDG46L2E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
          
      </ul>
  </Box>
  {/* Restaurant Owner  */}
  <Box bgcolor={palette.background.alt} p={'50px 0'} textAlign={'center'} color={palette.neutral.nav}>
      <Typography variant="h1" fontWeight={'bold'}>
        Are You A Restaurant Owner ?
      </Typography>
      <Button 
      type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: "white",
          "&:hover": {backgroundColor: palette.primary.light },
        }}
        onClick={() => navigate("/addRestaurant") }
      > Add A Restaurant </Button>
    </Box>
    <Footer/>
  </>
}

export default Credits;