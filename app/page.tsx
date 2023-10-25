"use client";
import { useMemo, useState } from 'react';
import { Flex, Heading, TextField, Button, Theme } from '@radix-ui/themes';
import { IconAlertHexagon, IconCheck, IconRotateClockwise2 } from '@tabler/icons-react';
import '@radix-ui/themes/styles.css';

enum STATUS {
  Idle = 'idle',
  Error = 'error',
  Success = 'success',
}

export default function Home() {
  const [status, setStatus] = useState<STATUS>(STATUS.Idle);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const icon = useMemo(() => {
    if (loading) return <IconRotateClockwise2 height="16" width="16" className='animate-spin' />;
    if (status === STATUS.Error) return <IconAlertHexagon height="16" width="16" />;
    return <IconCheck height="16" width="16" />;
  }, [status, loading]);

  const handleButtonClick = () => {
    setLoading(true);
    fetch('/api/test')
      .then(async (res) => {
        const data = await res.json();
        if (data.status === 'FAILURE') {
          setStatus(STATUS.Error);
          setMessage(data.message ?? '');
          return;
        }

        setStatus(STATUS.Success);
        setMessage('Test steps ran successfully');
      })
      .catch(() => {
        setStatus(STATUS.Error);
        setMessage('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Theme appearance="dark">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Flex direction="column" gap="2" className='w-2/3'>
          <Heading size='8'>
            Hello to QPros - selenium test runner
          </Heading>
          <Flex gap="2">
            <TextField.Root className='w-full'>
              <TextField.Slot>
                { icon }
              </TextField.Slot>

              <TextField.Input
                disabled
                value={loading ? 'Running selenium test steps, please wait...' : message}
              />
            </TextField.Root>
            <Button
              className='!cursor-pointer'
              disabled={loading}
              onClick={handleButtonClick}
            >
              Run test
            </Button>
          </Flex>
        </Flex>
      </main>
    </Theme>
  )
}
