/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Slider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import '../../css/Form.css';



const restoSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  phone: yup.string().required("required"),
  // minPriceo: yup.number().required("required"),
  picture: yup.string().required("required"),
  // tagso: yup.array().of(yup.string()).required("required"),
  description: yup.string().required("required"),
  // link: yup.string().required("required"),
  contactFirstName: yup.string().required("required"),
  contactLastName: yup.string().required("required"),
  contactEmail:  yup.string().email("invalid email").required("required"),
  contactPhone: yup.string().required("required")
});



const initialValuesResto = {
  name :"",
  address :"",
  city :"",
  phone :"",
  // minPriceo : "",
  picture :"",
  // tags :"",
  description :"",
  // link :"",
  contactFirstName :"",
  contactLastName :"",
  contactEmail :"",
  contactPhone :"",
};


const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const primaryMain = palette.primary.main;
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
  
    setIsKeyReleased(false);
  };
  
  const onKeyUp = () => {
    setIsKeyReleased(true);
  }
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }

  const addResto = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formDat = new FormData();
    for (let value in values) {
      formDat.append(value, values[value]);
    }
    formDat.append("picturePath", values.picture.name);
    formDat.append("minPrice", inputValue);
    let result = [];
    for (let i = 0; i < tags.length; i++) {
      result = tags[i];
    }
    formDat.append("tags", result);
    for (var [key, value] of formDat.entries()) { 
      console.log(key, value);
    }
    
    const savedResResponse = await fetch(
      "http://localhost:3002/addRestaurant",
      {
        method: "POST",
        body: formDat,
      }
    );
    const savedRes = await savedResResponse.json();
    
    onSubmitProps.resetForm();
    
    if (savedRes) {
      navigate('/home');
    }
      
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await addResto(values, onSubmitProps);
  };
  
  
  return (
  
  <Formik
    onSubmit={handleFormSubmit}
    initialValues={initialValuesResto}
    validationSchema={restoSchema}
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm,
    }) => (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        <Typography
            variant="h4"
            fontWeight={'500'}
            ml={'10px'}
            
            
          >
            Restaurant Informations
          </Typography>
          <hr />
        <Box
          display={'grid'}
          gridTemplateColumns={'repeat( 2,minmax( 0, 1fr))'}
          gap={'30px'}
          mt={'40px'}
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
          }}
        >
          
          <TextField
            label="Restaurant Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            name="name"
            error={
              Boolean(touched.name) && Boolean(errors.name)
            }
            helperText={touched.name && errors.name}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Restaurant Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.address}
            name="address"
            error={
              Boolean(touched.address) && Boolean(errors.address)
            }
            helperText={touched.address && errors.address}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            label="Restaurant City"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            name="city"
            error={
              Boolean(touched.city) && Boolean(errors.city)
            }
            helperText={touched.city && errors.city}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            label="Phone Number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            name="phone"
            error={
              Boolean(touched.phone) && Boolean(errors.phone)
            }
            helperText={touched.phone && errors.phone}
            sx={{ gridColumn: "span 2" }}
          />
          <Typography 
            variant="h4"
            fontWeight={'500'}
            sx={{ gridColumn: "span 2" }}
          >
            Minimum price of your meals : </Typography> 

            <Slider
              aria-label="Temperature"
              defaultValue={300}
              value={inputValue}
              name="minPriceo"
              valueLabelDisplay="auto"
              step={10}
              min={100}
              max={10000}
              onChange={(_, value) => setInputValue( parseInt(value))}
              sx={{transform:'translateX(50%) translateY(-50%) !immportant'}}
            />
            <Typography
              variant="h4"
              fontWeight={'500'}
              sx={{ gridColumn: "span 2" }}
            >
              Restaurant Images : 
            </Typography>
            <Box
              gridColumn="span 2"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
              {/* <input
                type='file'
                name='picture'
                accept='image/*'
                onChange={(e) =>
                  setFieldValue('picture', e.currentTarget.files[0])
                }
              /> */}
              {/* <input type="file" name="picture" /> */}
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <div className="containerT"
                sx={{ gridColumn: "span 2" }}
              >
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                  <button onClick={() => deleteTag(index)}>x</button>
                </div>
              ))}
                <input
                  value={input}
                  placeholder="Enter a tag ( separate tags with comma ' , ' )"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                />
              </div>
            </Box>
            <Typography sx={{ gridColumn: "span 2" }} variant="h4" fontWeight={'500'}>
              Restaurant Description : 
            </Typography>
            <Box sx={{ gridColumn: "span 2" }}>
              <textarea name="description" id="description" placeholder="Describe your restaurant ..."
                style={{
                  width: '100%',
                  height: '150px',
                  padding: '12px 20px',
                  boxSizing: 'border-box',
                  border: '2px s,olid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f8f8f8',
                  fontSize: '16px',
                  resize: 'none',
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
            </Box>
        </Box>
        <Typography
            variant="h4"
            fontWeight={'500'}
            ml={'10px'}
            mt={'20px'}
          >
            Contact Informations
          </Typography>
          <hr />
          <Box
            display={'grid'}
            gridTemplateColumns={'repeat( 2,minmax( 0, 1fr))'}
            gap={'30px'}
            mt={'40px'}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactFirstName}
              name="contactFirstName"
              error={
                Boolean(touched.contactFirstName) && Boolean(errors.contactFirstName)
              }
              helperText={touched.contactFirstName && errors.contactFirstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactLastName}
              name="contactLastName"
              error={
                Boolean(touched.contactLastName) && Boolean(errors.contactLastName)
              }
              helperText={touched.contactLastName && errors.contactLastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactEmail}
              name="contactEmail"
              error={
                Boolean(touched.contactEmail) && Boolean(errors.contactEmail)
              }
              helperText={touched.contactEmail && errors.contactEmail}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Phone Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactPhone}
              name="contactPhone"
              error={
                Boolean(touched.contactPhone) && Boolean(errors.contactPhone)
              }
              helperText={touched.contactPhone && errors.contactPhone}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
        {/* BUTTONS */}
        <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {backgroundColor: palette.primary.light },
              }}
            >
              Submit
            </Button>
            
          </Box>
      </form>
    )
    }
  </Formik>)
}

export default Form;