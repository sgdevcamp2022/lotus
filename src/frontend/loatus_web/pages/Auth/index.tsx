import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormHelperText, Input, InputLabel, StepContent, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import useTokenAxios from '@hooks/useTokenAxios';
import { AxiosResponse } from 'axios/index';
import { APIItem, lostarkInfo } from '@typings/db';
import { toast } from 'react-toastify';
import useToken from '@hooks/useToken';
import { useCookies } from 'react-cookie';
import useInput from '@hooks/useInput';
import CharacterSelect from '@components/CharacterSelect';
import useSWRRetry from '@hooks/useSWRRetry';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Auth() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [token, setToken] = useCookies(['refreshToken']);
  const { data: userData, error, mutate } = useSWRRetry(process.env.REACT_APP_DB_HOST + '/auth/my', token.refreshToken);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [randomCode, setRandomCode] = useState('');
  const steps = ['스토브 로그인', '소개글에 인증코드 게시', '인증하기'];
  const [stoveUrl, onChangeStoveUrl, setStoveUrl] = useInput('');
  const onClickCopyClipBoard = useCallback(async () => {
    if (!randomCode) {
      return;
    }
    try {
      await navigator.clipboard.writeText(randomCode);
      toast.success('인증코드가 클립보드에 복사되었습니다', {
        position: 'top-right',
      });
    } catch (e) {
      toast.error('복사에 실패했습니다.', {
        position: 'top-right',
      });
    }
  }, [randomCode]);
  const onSubmitAuthInfo = useCallback(
    (e: any) => {
      e.preventDefault();
      useTokenAxios(token.refreshToken)
        .post(
          process.env.REACT_APP_DB_HOST + '/auth/stove',
          {
            randomCode,
            stoveUrl,
          },
          {
            withCredentials: false,
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then((response: AxiosResponse<APIItem<lostarkInfo[]>>) => {
          if (response.data.code === 200) {
            toast.success(response.data.message, {
              position: 'top-right',
            });
          } else {
            toast.error(response.data.message, {
              position: 'top-right',
            });
            return;
          }
          mutate();
          navigate('/select');
        })
        .catch((error) => {
          toast.error('오류가 발생했습니다.\n기술팀에 문의해주세요!', {
            position: 'top-right',
          });
        });
    },
    [randomCode, stoveUrl],
  );
  const introduce = [
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>스토브 사이트에서 로그인해주세요</Typography>
      <Button onClick={() => window.open('https://www.onstove.com/')}>스토브 가기</Button>
    </>,
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>소개글에 아래의 인증코드를 게시해주세요</Typography>
      <Input readOnly id="component-disabled" value={randomCode || '값을 불러올 수 없습니다'} sx={{ color: 'gray' }} />
      <Button onClick={onClickCopyClipBoard}>복사</Button>
    </>,
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>소개글을 게시한 타임라인 url을 입력하고 인증하기를 눌러주세요</Typography>
      <form onSubmit={onSubmitAuthInfo}>
        <FormControl fullWidth required>
          <TextField onChange={onChangeStoveUrl} value={stoveUrl} variant={'filled'} />
          <Button type="submit">인증하기</Button>
        </FormControl>
      </form>
    </>,
  ];

  useEffect(() => {
    useTokenAxios(token.refreshToken)
      .get(process.env.REACT_APP_DB_HOST + '/auth/randomcode', {
        withCredentials: false,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((response: AxiosResponse<APIItem<string>>) => {
        setRandomCode(response.data.data);
      })
      .catch((error) => {
        toast.error('인증번호를 불러올 수 없습니다.', {
          position: 'top-right',
        });
      });
  }, []);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (!userData) {
    return <Navigate to={'/'} />;
  }
  return (
    <Box sx={{ minWidth: '1057px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography sx={{ color: 'black' }}>{label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>모든 작업이 끝났습니다!</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {introduce[activeStep]}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep !== steps.length - 1 && <Button onClick={handleNext}>Next</Button>}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
