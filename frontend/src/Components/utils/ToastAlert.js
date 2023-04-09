let toastAlert = (toast, msg, status) => {
    toast({
        title: msg,
        position: "top",
        isClosable: true,
        status: status,
        duration: 5000,
    });
};

export { toastAlert }