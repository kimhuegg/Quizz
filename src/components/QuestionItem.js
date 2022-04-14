import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function QuestionItem({questionItem, value, handleAnswer}) {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={value? value : ''}
                name="radio-buttons-group"
                onChange={handleAnswer}
            >
                <FormControlLabel value={questionItem.answer1} control={<Radio />} label={questionItem.answer1} />
                <FormControlLabel value={questionItem.answer2} control={<Radio />} label={questionItem.answer2} />
                <FormControlLabel value={questionItem.answer3} control={<Radio />} label={questionItem.answer3} />
                <FormControlLabel value={questionItem.answer4} control={<Radio />} label={questionItem.answer4} />

            </RadioGroup>
        </FormControl>
    )
}

export default QuestionItem