import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Terms_And_Conditions_Step from './tc_step';
import Brightness_Step from './brightness_step';
import Test_Step from './test_step';
import Calibration_Step from './calibration_step';


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
}));
    
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...((ownerState.active || ownerState.completed) && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));
    
function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
            <div className="QontoStepIcon-circle" />
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};


function HorizontalLinearStepper() {
    // Var for checking if the test has been completed
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [sessionId, setSessionId] = useState("");


    // Callback function for test completion
    const handleTestCompletion = React.useCallback((completed) => {
        setIsTestCompleted(completed);
    }, []);

    // Callback function for session id
    const handleSessionIdChange = React.useCallback((sessionId) => {
        setSessionId(sessionId);
    }, []);

    const steps = [
        <Terms_And_Conditions_Step/>, 
        <Brightness_Step/>, 
        <Calibration_Step/>, 
        <Test_Step key="test" onTestCompletion={handleTestCompletion} onSessionIdChange={handleSessionIdChange}/>];
    const [activeStep, setActiveStep] = React.useState(0);

    const isTestStep = activeStep ===3;

    const handleNext = () => {
        if (isTestStep && !isTestCompleted) {
            alert("Please complete the test before continuing.");
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
        {activeStep === steps.length ? (
            <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
            </Box>
            </React.Fragment>
        ) : (
            <React.Fragment>
            {steps.at(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <Chip 
                    onClick={handleNext}
                    label="Continue" 
                    color="primary" 
                    clickable 
                    sx={{ 
                        fontFamily: 'helvetica',
                        fontWeight: 500,
                        fontSize: { xs: 16, sm: 19, md: 22 },
                        padding: { xs: 1, sm: 2, md: 3 },
                        "& .MuiChip-label": {
                            paddingLeft: { xs: 2, sm: 4, md: 6 },
                            paddingRight: { xs: 2, sm: 4, md: 6 }
                        },
                        marginTop: 4,
                        marginBottom: 4,
                        backgroundColor: "#1c4aa6",
                        borderRadius: 0
                    }}
                />
            </Box>
            </React.Fragment>
        )}
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label) => {
            return (
                <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
            );
            })}
        </Stepper>
        </Box>
    );
}

export default HorizontalLinearStepper;