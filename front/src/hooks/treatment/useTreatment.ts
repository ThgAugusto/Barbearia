import { useEffect, useCallback, useState } from "react";
import TreatmentService from "../../services/treatmentService";
import { useDashboard } from "../../context/DashboardProvider";
import { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { Data, Treatment } from "../../types/treatment";
import { useSearchParams } from "react-router-dom";

export const useTreatment = (barbershopId: number) => {
    const { dashboardData, setDashboardData } = useDashboard();
    const treatmentService = TreatmentService();
    const [showForm, setShowForm] = useState<boolean>(false);

    const updateTreatmentState = useCallback((shopId: number, updatedTreatments: Treatment[]) => {
        setDashboardData(prev => ({
            ...prev,
            treatments: {
                ...prev.treatments,
                [shopId]: updatedTreatments,
            },
        }));
    }, [setDashboardData]);

    const fetchData = useCallback(async () => {
        if (!dashboardData.treatments[barbershopId]) {
            const data = await treatmentService.findByBarbershopId(barbershopId);
            updateTreatmentState(barbershopId, data);
        }
    }, [dashboardData, barbershopId, treatmentService, updateTreatmentState]);

    const create = async (treatment: Data, formikHelpers: FormikHelpers<Data>) => {
        console.log(treatment.barbershopId)
        try {
            const response = await treatmentService.create(treatment);
            if (response) {
                updateTreatmentState(barbershopId, [
                    ...(dashboardData.treatments[barbershopId] || []),
                    response,
                ]);
                setShowForm(false)
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const update = async (treatment: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => {
        try {
            if (!treatment.id) {
                throw new Error("Treatment ID is required for updating");
            }


            const { id, ...treatmentDataWithoutId } = treatment;
            const response = await treatmentService.update(id, treatmentDataWithoutId);

            if (response) {
                updateTreatmentState(
                    barbershopId,
                    dashboardData.treatments[barbershopId].map((item) =>
                        item.id === treatment.id ? response : item
                    )
                );
                setShowForm(false)
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const softDelete = async (id: number) => {
        try {
            const response = await treatmentService.softDelete(id);
            updateTreatmentState(
                barbershopId,
                dashboardData.treatments[barbershopId].map((item) =>
                    item.id === id ? response : item
                )
            );
        } catch (error) {
            console.error("Erro ao deletar tratamento:", error);
        }
    };

    const restore = async (id: number) => {
        try {
            const response = await treatmentService.restore(id);
            updateTreatmentState(
                barbershopId,
                dashboardData.treatments[barbershopId].map((item) =>
                    item.id === id ? response : item
                )
            );
        } catch (error) {
            console.error("Erro ao restaurar tratamento:", error);
        }
    };

    const handleError = (error: unknown, setErrors: FormikHelpers<Data>['setErrors']) => {
        if (error instanceof AxiosError) {
            setErrors(error.response?.data?.message);
        } else {
            console.error('Erro inesperado:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [barbershopId]);

    return {
        treatmentsData: dashboardData.treatments[barbershopId] || [],
        barbershop: dashboardData.barbershops.find((barbershop) => barbershop.id === barbershopId) || null,
        create,
        update,
        softDelete,
        restore,
        showForm, setShowForm
    };
};
export const useTreatmentModal = () => {
    const [isModalOpenTreatment, setIsModalOpenTreatment] = useState(false);
    const [barbershopId, setBarbershopId] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const openTreatmentModal = (id: number) => {
        setSearchParams(prevParams => {
            prevParams.set("treatment", "true");
            prevParams.set("barbershopId", String(id));
            prevParams.set("modalOpenTreatment", "true");
            return prevParams;
        }, { replace: true });
    };

    const closeTreatmentModal = () => {
        setSearchParams(prevParams => {
            prevParams.delete("treatment");
            prevParams.delete("barbershopId");
            prevParams.delete("modalOpenTreatment");
            return prevParams;
        }, { replace: true });
    };

    useEffect(() => {
        const treatment = searchParams.get("treatment");
        const barbershopIdParam = searchParams.get("barbershopId");
        const modalOpen = searchParams.get("modalOpenTreatment");

        console.log(' - searchParams', searchParams.toString());
        console.log(' - barbershopIdParam', barbershopIdParam);

        if (treatment === "true" && barbershopIdParam && modalOpen === "true") {
            const shopId = Number(barbershopIdParam);
            if (!isNaN(shopId)) {
                setBarbershopId(shopId);
                setIsModalOpenTreatment(true);
            } else {
                setIsModalOpenTreatment(false); 
            }
        } else {
            setIsModalOpenTreatment(false);
            setBarbershopId(null);  
        }
    }, [searchParams]);
    return {
        openTreatmentModal,
        closeTreatmentModal,
        isModalOpenTreatment,
        barbershopId,  
    };
};