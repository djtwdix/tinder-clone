import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React, { useState } from "react";
import "./AddPupForm.scss";
import db from "../firebase";
import axios from "axios";

export default function AddPupForm({ user }) {
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharRemaining] = useState(140);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const addPup = (e) => {
    e.preventDefault();
    console.log("clicked");
    const dogsRef = db.collection("dogs");
    dogsRef.doc().set({
      ...formData,
      owner_id: user.uid,
      owner: {
        id: user.uid,
        photoURL: user.photoURL,
        name: user.displayName,
      },
    });
  };

  const addPupMongo = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post("/pups/new", { ...formData, owner_id: user.uid });
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    setFormData({ ...formData, date: date });
    console.log(formData);
  };

  const handleEnergyChange = (event, number) => {
    setFormData({ ...formData, energy: number });
    console.log(formData);
  };

  return (
    <form className="pupForm" onSubmit={addPupMongo}>
      <FormControl>
        <InputLabel htmlFor="image">Image</InputLabel>
        <Input
          type="text"
          name="photoURL"
          id="image"
          value={formData.photoURL}
          aria-describedby="image"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          name="name"
          id="name"
          value={formData.name}
          aria-describedby="name"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <TextField
          error={charRemaining < 0}
          multiline
          label="Bio"
          name="bio"
          value={formData.bio}
          id="bio"
          aria-describedby="bio"
          onChange={handleChange}
        />
        <FormHelperText>{charRemaining} characters remaining</FormHelperText>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel className="pupForm__energy" component="legend">
          Gender
        </FormLabel>
        <RadioGroup
          value={formData.gender}
          name="gender"
          onChange={handleChange}
          aria-label="gender"
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
            labelPlacement="start"
            style={{
              color: "black",
            }}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            labelPlacement="start"
            style={{
              color: "black",
            }}
          />
        </RadioGroup>
      </FormControl>
      <InputLabel className="pupForm__energy" htmlFor="energy" mt="3">
        Energy
      </InputLabel>
      <Slider
        defaultValue={1}
        id="energy"
        name="energy"
        onChange={handleEnergyChange}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="auto"
        min={1}
        max={5}
      />

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          value={selectedDate}
          name="date"
          format="MM/DD/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Birthday"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button type="submit">Submit</Button>
    </form>
  );
}
