import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@mui/material";
import { UpdateBookRequest, useCreateBookMutation, useDeleteBookMutation, useGetAllBooksQuery, useUpdateBookMutation } from "../api/auth";
import { BookList } from "../types/common";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../assests/bookshelfSVG.svg'
import { logoStyle } from "../components/AppAppBar";
import ToggleColorMode from "../components/ToggleColorMode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleColorMode, toggleModal } from "../store/slices/appSlice";
import CustomizedDialogs from "../components/Modal";
import { useState } from "react";

function BooksPage() {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.app.mode)
    const { data } = useGetAllBooksQuery(undefined)
    const [createBookMutation, { isLoading: creatingBook }] = useCreateBookMutation();
    const [updateBookMutation, { isLoading: updatingBook }] = useUpdateBookMutation();
    const [deleteBookMutation] = useDeleteBookMutation();
    const rows = data?.data ?? []
    const [initialValues, setInitialValues] = useState<UpdateBookRequest>({ id: 0 })
    const [actionType, setActionType] = useState<"create" | "update">("create")

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const formState = {
            title: data.get('title') as string,
            author: data.get('author') as string,
            published: +(data.get('published') as string),
            pages: +(data.get('pages') as string),
            isbn: data.get('isbn') as string,
        }

        try {
            if (actionType === 'create') {
                await createBookMutation(formState).unwrap().finally(() => {
                    dispatch(toggleModal())
                });
            } else {
                console.log("{ ...formState, id: initialValues.id }: ", { ...formState, id: initialValues.id });

                await updateBookMutation({ ...formState, id: initialValues.id }).unwrap().finally(() => {
                    dispatch(toggleModal())
                });
            }
        } catch (err) {
            console.log('create book error: ', err);
            dispatch(toggleModal())
        }
    };

    return (
        <div>
            <AppBar
                position="static"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <img
                                src={logo}
                                style={logoStyle}
                                className={mode === 'dark' ? 'logo-dark' : 'logo-ligt'}
                                alt="logo of sitemark"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    setActionType('create')
                                    dispatch(toggleModal())
                                }}
                            >
                                Qo'shish
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <TableContainer component={Paper}
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Sarlavha</TableCell>
                            <TableCell>Muallif</TableCell>
                            <TableCell>Chiqarilgan yili</TableCell>
                            <TableCell>Sahifalar soni</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: BookList) => (
                            <TableRow
                                key={row.book.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.book.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.book.title}
                                </TableCell>
                                <TableCell>{row.book.author}</TableCell>
                                <TableCell>{row.book.published}</TableCell>
                                <TableCell>{row.book.pages}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="delete"
                                        color="primary"
                                        onClick={() => {
                                            setActionType('update')
                                            setInitialValues(row.book)
                                            dispatch(toggleModal())
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="error" onClick={async () => {
                                        try {
                                            console.log('row.book.id: ', row.book.id);

                                            await deleteBookMutation({ id: row.book.id })
                                        } catch (error) {
                                            console.log('delete book error: ', error);
                                        }
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomizedDialogs
                title={actionType === 'create' ? "Kitob qo'shish" : "Kitobni tahrirlash"}
                saveFunc={handleSave}
                isLoading={actionType === 'create' ? creatingBook : updatingBook}
            >
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Nomi"
                                name="title"
                                autoComplete="title"
                                defaultValue={initialValues.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="author"
                                label="Muallif"
                                name="author"
                                autoComplete="author"
                                defaultValue={initialValues.author}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                name="published"
                                label="Chiqarilgan yil"
                                id="published"
                                autoComplete="published"
                                defaultValue={initialValues.published}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                name="pages"
                                label="Sahifalar soni"
                                id="pages"
                                autoComplete="pages"
                                defaultValue={initialValues.pages}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                name="isbn"
                                label="isbn"
                                id="isbn"
                                autoComplete="isbn"
                                defaultValue={initialValues.isbn}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CustomizedDialogs>
        </div>
    )
}

export default BooksPage