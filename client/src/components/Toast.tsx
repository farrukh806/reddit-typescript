import { useToast, Button } from "@chakra-ui/react"

function ModalBox(props) {
    const toast = useToast()
    return (
      <Button
        onClick={() =>
          toast({
            title: props.title,
            description: props.description,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
    )
  }