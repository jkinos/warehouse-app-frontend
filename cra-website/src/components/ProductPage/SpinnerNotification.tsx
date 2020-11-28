import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

interface NotificationProps {
    variant: string,
    message: string
  }

const SpinnerNotification: React.FC<NotificationProps> = ({variant, message}) => {
    return (
      <Alert variant={variant}>
        <span>
          <Spinner animation="border" variant="dark" />
          <Alert.Heading style={{display:'inline-block'}}>
            {message}
          </Alert.Heading>
        </span>
      </Alert>
    )
  }
export default SpinnerNotification
  