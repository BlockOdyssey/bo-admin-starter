import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import useMenu from "hooks/useMenu";
import useErrorMsg from "hooks/useErrorMsg";

import { summarySelector, getSummaryInfo, createSummaryInfo, updateSummaryInfo, deleteSummaryInfo, resetStates, clearError } from "slices/summarySlice";
import { setMessage, setMsgConfirm, setClose, setMsgConfirmClose } from "slices/modalSlice";

import { isEmpty } from "utils/common";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useStyles from "styles/customize/table/DetailTableStyles";
import formStyles from "styles/customize/components/FormStyles";
import formTheme from "styles/theme/form";
import { ThemeProvider } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";

import Input from "common/form/Input";
import FormSelect from "common/form/Select";
import CheckBox from "common/form/CheckBox";
import RadioButton from "common/form/RadioButton";

import ListButton from "common/button/PageButton";
import SubmitButton from "common/button/SubmitButton";
import MessageModal from "common/modal/MessageModal";
import ConfirmModal from "common/modal/ConfirmModal";

import { sampleData, tableSelectOptions } from "components/Data";

const schema = yup.object().shape({
    category: yup.object().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    calories: yup.number().min(0).positive().required(),
    fat: yup.number().min(0).positive().required(),
    carbs: yup.number().min(0).positive().required(),
    protein: yup.number().min(0).positive().required(),
    quantity: yup.number().min(0).positive().required(),
    color: yup.string().required(),
    useYn: yup.string().required(),
    viewYn: yup.string().required()
});

export default function DashboardUpload() {
    const classes = useStyles();
    const formClasses = formStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { idx } = useParams();

    const { errors, clearErrors, control, register, setError, reset, getValues, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const { data, images, status, statusCode, errorMsg } = useSelector(summarySelector);
    const sampleDessert = idx ? sampleData : null;

    const [imageIndex, setImageIndex] = useState(0);
    const [imageFiles, setImageFiles] = useState([]);
    const [deleteImage, setDeleteImage] = useState({});

    const [imageLoading, setImageLoading] = useState(false); // ????????? ????????? ?????? ??????
    const [submitLoading, setSubmitLoading] = useState(false); // ?????? / ?????? ?????? ??????
    const [actionType, setActionType] = useState("submit"); // ?????? ??????

    // ?????? ????????????
    useMenu({ page: "Dashboard Upload", menu: "summary", title: "Dashboard", num: 1 });

    // ????????? ????????????
    const handleData = useCallback(async () => {
        if (idx) {
            // await dispatch(getSummaryInfo(`/web/example?idx=${idx}`));
        }
    }, [dispatch, idx]);

    useEffect(() => {
        handleData();
    }, [handleData]);

    // ???????????? -- ????????? ?????????
    useEffect(() => {
        if (!idx) {
            reset({
                category: { value: "", label: "??????????????? ??????????????????" },
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
                quantity: 0,
                useYn: "Y",
                viewYn: "Y"
            });
        }
    }, [idx, reset]);

    // ????????? ????????? ????????????
    useEffect(() => {
        // sampleData -> data??? ??????
        if (idx && sampleData) {
            reset({
                category: { value: sampleData.category, label: sampleData.category },
                name: sampleData.name,
                calories: sampleData.calories,
                fat: sampleData.fat,
                carbs: sampleData.carbs,
                protein: sampleData.protein,
                quantity: sampleData.quantity,
                color: sampleData.color,
                ingredients_1: true,
                ingredients_2: true,
                ingredients_3: true,
                ingredients_4: false,
                useYn: sampleData.useYn,
                viewYn: sampleData.viewYn
            });
        }
    }, [idx, reset]);

    // ????????? ????????? ??? ????????????
    useEffect(() => {
        if (imageFiles.length === 0 && images.length > 0) {
            for (let i in images) {
                if (images[i]) {
                    setImageFiles((prevState) => [
                        ...prevState,
                        {
                            file: null,
                            preview: images[i].src
                        }
                    ]);
                }
            }
        }
    }, [images, imageFiles]);

    // ?????? ????????? ????????????
    useErrorMsg(status, statusCode, errorMsg);

    // ????????? ?????? ????????? (??????)
    const handleImageFile = async (e) => {
        setImageLoading(true);

        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                // ????????? preview ?????????
                let reader = new FileReader();
                reader.onloadend = () => {
                    setImageFiles((prevState) => [
                        ...prevState,
                        {
                            file: files[i],
                            preview: reader.result
                        }
                    ]);
                };
                reader.readAsDataURL(files[i]);
            }
        }
        setImageLoading(false);
    };

    // ???????????? -- ????????? ??????
    const handleDeleteImage = (imageIndex) => {
        const filtered = imageFiles.filter((_, index) => index !== imageIndex);
        setImageIndex(0);
        setImageFiles(filtered);
    };

    // ???????????? -- ????????? ??????
    const handleRemoveImage = async () => {
        dispatch(setMsgConfirmClose());
        const { imageIndex } = deleteImage;

        // ????????? ?????? API
        const resultAction = await dispatch(deleteSummaryInfo({ url: "/web/example", data: { imageIndex } }));
        if (deleteSummaryInfo.fulfilled.match(resultAction)) {
            // ?????? ??????
        } else {
            if (resultAction.payload) {
                dispatch(setMessage({ open: true, message: resultAction.payload.message }));
            } else {
                dispatch(setMessage({ open: true, message: "???????????? ??????" }));
            }
        }
    };

    // Form Data ????????????
    const handleFormData = () => {
        const data = getValues();

        let error = false;
        if (isEmpty(data.category.value)) {
            setError("category", { type: "manual", message: "??????????????? ??????????????????" });
            error = true;
        }

        if (idx) {
            if (isEmpty(images) && isEmpty(imageFiles)) {
                return dispatch(setMessage({ open: true, message: "?????? ????????? ?????????????????? ??????????????????" }));
            }
        } else {
            if (isEmpty(imageFiles)) {
                return dispatch(setMessage({ open: true, message: "?????? ????????? ?????????????????? ??????????????????" }));
            }
        }

        let ingredients = "";
        if (data.ingredients_1) {
            ingredients += "1,";
        }
        if (data.ingredients_2) {
            ingredients += "2,";
        }
        if (data.ingredients_3) {
            ingredients += "3,";
        }
        if (data.ingredients_4) {
            ingredients += "4,";
        }

        if (ingredients) {
            ingredients = ingredients.slice(0, ingredients.length - 1);
        }

        if (idx && isEmpty(ingredients)) {
            setError("ingredients", { type: "manual", message: "????????? ??????????????????" });
            error = true;
        }

        if (error) {
            return;
        }

        let formData = new FormData();
        if (idx) {
            formData.append("idx", idx);
        }
        formData.append("category", data.category.value);
        formData.append("name", data.name);
        formData.append("calories", data.calories);
        formData.append("fat", data.fat);
        formData.append("carbs", data.carbs);
        formData.append("protein", data.protein);
        formData.append("ingredients", ingredients);
        formData.append("quantity", data.quantity);
        formData.append("color", data.color);
        formData.append("useYn", data.useYn);
        formData.append("viewYn", data.viewYn);

        if (imageFiles) {
            for (let key in imageFiles) {
                if (imageFiles[key].file) {
                    formData.append("images", imageFiles[key].file);
                }
            }
        }

        return formData;
    };

    // ???????????? / ????????????
    const handleDataSubmit = async () => {
        dispatch(setMsgConfirmClose());

        let formData = handleFormData();
        if (!formData) {
            return;
        } else {
            setSubmitLoading(true);
        }

        // ?????? API
        if (idx) {
            const resultAction = await dispatch(updateSummaryInfo({ url: "/web/example", data: formData }));
            if (updateSummaryInfo.fulfilled.match(resultAction)) {
                // ??????
            } else {
                if (resultAction.payload) {
                    dispatch(setMessage({ open: true, message: resultAction.payload.message }));
                } else {
                    dispatch(setMessage({ open: true, message: "???????????? ??????" }));
                }
            }
            // ?????? API
        } else {
            const resultAction = await dispatch(createSummaryInfo({ url: "/web/example", data: formData }));
            if (createSummaryInfo.fulfilled.match(resultAction)) {
                //??????
            } else {
                if (resultAction.payload) {
                    dispatch(setMessage({ open: true, message: resultAction.payload.message }));
                } else {
                    dispatch(setMessage({ open: true, message: "???????????? ??????" }));
                }
            }
        }
    };

    // ????????? ????????????
    const onClick = () => {
        onClose();
        onReset();
        dispatch(resetStates());

        return history.push({
            pathname: "/",
            search: location.search
        });
    };

    // ????????? ?????? ??????
    const onPreviousImage = () => {
        // ???????????? ????????? ???
        if (imageFiles.length <= 1) {
            return;
        }

        const prevIndex = imageIndex - 1;
        if (prevIndex < 0) {
            setImageIndex(imageFiles.length - 1);
        } else {
            setImageIndex(prevIndex);
        }
    };

    // ????????? ?????? ??????
    const onNextImage = () => {
        // ???????????? ????????? ???
        if (imageFiles.length <= 1) {
            return;
        }

        const nextIndex = imageIndex + 1;
        if (imageIndex >= imageFiles.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex(nextIndex);
        }
    };

    // ????????? ?????? ?????????
    const onReset = () => {
        clearErrors();
        reset({
            category: { value: "", label: "??????????????? ??????????????????" },
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
            quantity: 0,
            useYn: "Y",
            viewYn: "Y"
        });
    };

    // ??????/?????? ?????? ????????? ?????????
    const onSubmit = () => {
        setActionType("submit");
        dispatch(setMsgConfirm({ open: true, message: idx ? "????????? ????????? ?????????????????????????" : "????????? ????????? ?????????????????????????" }));
    };

    // ?????? ?????? ?????????
    const onConfirm = (type, data) => {
        let message = "";
        if (type === "delete") {
            message = "???????????? ?????????????????????????";
            setDeleteImage(data);
        } else if (type === "editCancel") {
            message = "???????????? ????????????????????????? ????????? ????????? ???????????? ????????????.";
        } else if (type === "uploadCancel") {
            message = "???????????? ????????????????????????? ????????? ????????? ???????????? ????????????.";
        }

        setActionType(type);
        dispatch(setMsgConfirm({ open: true, message }));
    };

    // ?????? ??????
    const onClose = () => {
        dispatch(setClose());
        dispatch(clearError());
    };

    return (
        <ThemeProvider theme={formTheme}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <div className={classes.root}>
                    <div className={classes.heading}>
                        <ChevronLeftIcon onClick={onClick} />
                        <Typography variant="h2" component="h3" display="inline">
                            ????????? {idx ? "????????????" : "????????????"}
                        </Typography>
                    </div>
                    <Paper className={classes.paper} elevation={0}>
                        <div className={classes.contentContainer}>
                            <div className={classes.contentImage}>
                                <Typography className={classes.heading} variant="h2" component="h4" display="block">
                                    ????????? ?????? ??????
                                </Typography>
                                {imageFiles[imageIndex] ? (
                                    <div>
                                        <Grid className={classes.imageContainer} container justify="flex-start" alignItems="center">
                                            <img width={500} height={500} src={imageFiles[imageIndex].preview} alt="product img" />
                                            <Grid className={classes.imageButtonContainer} item container justify="space-between" alignItems="center">
                                                <Button startIcon={<ChevronLeftIcon />} className={classes.imageButton} variant="contained" onClick={onPreviousImage}></Button>
                                                <Button endIcon={<ChevronRightIcon />} className={classes.imageButton} variant="contained" onClick={onNextImage}></Button>
                                            </Grid>
                                        </Grid>
                                        <Grid container justify="flex-start" alignItems="center" className={classes.imagePreviewContainer}></Grid>
                                    </div>
                                ) : (
                                    <div className={classes.noImage}>No Image</div>
                                )}
                                <div className={classes.uploadContainer}>
                                    {imageFiles.map((image, index) => (
                                        <React.Fragment key={index}>
                                            {image && (
                                                <div key={`upload-preview-container-${index}`} className={classes.uploadPreviewContainer}>
                                                    <img key={`upload-preview-${index}`} width={70} height={70} src={image.preview} alt={`inspct-img ${index}`} />
                                                    {idx && images[index] ? (
                                                        <IconButton
                                                            key={`upload-preview-delete-button-${index}`}
                                                            aria-label="delete"
                                                            onClick={() => onConfirm("delete", { imageIndex: images[index].idx, index })}>
                                                            <Close key={`upload-preview-delete-icon-${index}`} />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton key={`upload-preview-delete-button-${index}`} aria-label="delete" onClick={() => handleDeleteImage(index)}>
                                                            <Close key={`upload-preview-delete-icon-${index}`} />
                                                        </IconButton>
                                                    )}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    {/* ??????, ?????? ????????? ????????? */}
                                    <input multiple disabled={imageLoading} onChange={handleImageFile} onClick={(e) => (e.target.value = null)} accept="image/*" id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton disabled={imageLoading} className={classes.uploadButton} color="primary" aria-label="upload product image" component="span">
                                            <AddIcon />
                                        </IconButton>
                                    </label>
                                </div>
                            </div>
                            <div className={classes.tableContainer}>
                                <Typography className={classes.heading} variant="h2" component="h4" display="block">
                                    ????????? ?????? ??????
                                </Typography>
                                <table className={classes.noBorderTable}>
                                    <colgroup>
                                        <col width="20%"></col>
                                        <col width="80%"></col>
                                    </colgroup>
                                    <tbody>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>????????????</th>
                                            <td className={classes.selectContent}>
                                                <FormSelect
                                                    name="category"
                                                    defaultValue={sampleDessert ? { value: sampleDessert.category, label: sampleDessert.category } : { value: "", label: "??????????????? ??????????????????" }}
                                                    control={control}
                                                    options={[
                                                        { value: "", label: "??????????????? ??????????????????" },
                                                        { value: "Cupcake", label: "Cupcake" },
                                                        { value: "Cookie", label: "Cookie" }
                                                    ]}
                                                />
                                                <Typography component="span" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.category && "??????????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>????????????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="text"
                                                    name="name"
                                                    defaultValue={sampleDessert && sampleDessert.name ? sampleDessert.name : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="span" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.name && "??????????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>??????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="text"
                                                    name="color"
                                                    defaultValue={sampleDessert && sampleDessert.color ? sampleDessert.color : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="p" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.color && "????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>??????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="number"
                                                    name="quantity"
                                                    defaultValue={sampleDessert && sampleDessert.quantity ? sampleDessert.quantity : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="span" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.quantity && "????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>????????? ??????</th>
                                            <td className={classes.content}>
                                                <textarea
                                                    aria-label="type description"
                                                    className={formClasses.textarea}
                                                    rows="10"
                                                    cols=""
                                                    name="description"
                                                    defaultValue={sampleDessert && sampleDessert.description ? sampleDessert.description : ""}
                                                    required
                                                    placeholder=""
                                                    autoComplete="off"
                                                    ref={register}></textarea>
                                                <Typography component="p" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.description && "????????? ????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>?????? ??????</th>
                                            <td className={classes.content}>
                                                <CheckBox
                                                    options={[
                                                        { defaultValue: false, name: "ingredients_1", label: "chocolate" },
                                                        { defaultValue: false, name: "ingredients_2", label: "strawberry" },
                                                        { defaultValue: false, name: "ingredients_3", label: "cheese" },
                                                        { defaultValue: false, name: "ingredients_4", label: "others" }
                                                    ]}
                                                    control={control}
                                                />
                                                <Typography component="span" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.ingredients && "????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>?????????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="number"
                                                    name="calories"
                                                    defaultValue={sampleDessert && sampleDessert.calories ? sampleDessert.calories : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="p" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.calories && "???????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>??????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="number"
                                                    name="fat"
                                                    defaultValue={sampleDessert && sampleDessert.fat ? sampleDessert.fat : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="p" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.fat && "????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>?????????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="number"
                                                    name="protein"
                                                    defaultValue={sampleDessert && sampleDessert.protein ? sampleDessert.protein : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="p" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.protein && "???????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>????????????</th>
                                            <td className={classes.textContentContainer}>
                                                <Input
                                                    inputType="number"
                                                    name="carbs"
                                                    defaultValue={sampleDessert && sampleDessert.carbs ? sampleDessert.carbs : ""}
                                                    control={control}
                                                    classes={formClasses}
                                                />
                                                <Typography component="p" variant="body2" className={formClasses.errorMessage}>
                                                    {errors.carbs && "??????????????? ??????????????????."}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>?????? ??????</th>
                                            <td className={classes.textContentContainer}>
                                                <RadioButton
                                                    name="viewYn"
                                                    defaultValue={sampleDessert && sampleDessert.viewYn ? sampleDessert.viewYn : "Y"}
                                                    control={control}
                                                    options={tableSelectOptions["viewYn"]}
                                                />
                                                {errors.viewYn && (
                                                    <Typography component="span" variant="body2" className={formClasses.errorMessage}>
                                                        {errors.viewYn && "?????? ????????? ??????????????????."}
                                                    </Typography>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <th className={classes.label}>?????? ??????</th>
                                            <td className={classes.textContentContainer}>
                                                <RadioButton
                                                    name="useYn"
                                                    defaultValue={sampleDessert && sampleDessert.useYn ? sampleDessert.useYn : "Y"}
                                                    control={control}
                                                    options={tableSelectOptions["useYn"]}
                                                />
                                                {errors.useYn && (
                                                    <Typography component="span" variant="body2" className={formClasses.errorMessage}>
                                                        {errors.useYn && "?????? ????????? ??????????????????."}
                                                    </Typography>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Paper>
                    <Grid container justify="flex-start" alignItems="center">
                        <div className={classes.buttonsContainer}>
                            <ListButton disabled={submitLoading} text="??????" pageType="search" onClick={() => onConfirm(idx ? "editCancel" : "uploadCancel")} />
                        </div>
                        <div className={classes.buttonsContainer}>
                            {idx && location.pathname && location.pathname.includes("/edit") ? (
                                <SubmitButton text="????????????" loading={submitLoading} type="submit" />
                            ) : (
                                <SubmitButton text="????????????" loading={submitLoading} type="submit" />
                            )}
                        </div>
                    </Grid>
                </div>
            </form>
            <MessageModal onClose={onClose} />
            <ConfirmModal onClose={onClose} handleConfirm={actionType === "delete" ? handleRemoveImage : actionType === "editCancel" || actionType === "uploadCancel" ? onClick : handleDataSubmit} />
        </ThemeProvider>
    );
}
