-- Função para desativar os barbeiros associados a uma barbearia
CREATE OR REPLACE FUNCTION soft_delete_barbershop()
RETURNS TRIGGER AS $$
BEGIN
  -- Desativa todos os barbeiros associados a esta barbearia
  UPDATE "User"
  SET "status" = 'INACTIVE'
  WHERE "barbershopId" = NEW.id
    AND "role" = 'BARBER'
    AND "status" = 'ACTIVE';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger que chama a função de soft delete para barbeiros quando a barbearia for desativada
CREATE TRIGGER soft_delete_barbershop_trigger
AFTER UPDATE ON "Barbershop"
FOR EACH ROW
WHEN (NEW."status" = 'INACTIVE' AND OLD."status" <> 'INACTIVE')
EXECUTE FUNCTION soft_delete_barbershop();


-- Função para cancelar os agendamentos associados a um barbeiro
CREATE OR REPLACE FUNCTION soft_delete_barber_scheduling()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza os agendamentos para 'CANCELLED' se o barbeiro for desativado
  UPDATE "Scheduling"
  SET "status" = 'CANCELLED'
  WHERE "barberId" = NEW.id
    AND "status" = 'SCHEDULED';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger que chama a função de cancelamento de agendamentos quando o barbeiro for desativado
CREATE TRIGGER soft_delete_barber_scheduling_trigger
AFTER UPDATE ON "User"
FOR EACH ROW
WHEN (NEW."status" = 'INACTIVE' AND OLD."status" <> 'INACTIVE' AND NEW."role" = 'BARBER')
EXECUTE FUNCTION soft_delete_barber_scheduling();


-- Função para desativar as barbearias associadas a um dono desativado
CREATE OR REPLACE FUNCTION soft_delete_owner_barbershops()
RETURNS TRIGGER AS $$
BEGIN
  -- Desativa todas as barbearias associadas ao proprietário
  UPDATE "Barbershop"
  SET "status" = 'INACTIVE'
  WHERE "ownerId" = NEW.id
    AND "status" = 'ACTIVE';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger que chama a função de desativar barbearias quando o proprietário for desativado
CREATE TRIGGER soft_delete_owner_barbershops_trigger
AFTER UPDATE ON "User"
FOR EACH ROW
WHEN (NEW."status" = 'INACTIVE' AND OLD."status" <> 'INACTIVE' AND NEW."role" = 'OWNER')
EXECUTE FUNCTION soft_delete_owner_barbershops();


-- Função que atualiza o status dos agendamentos associados a um tratamento para 'CANCELLED' 
CREATE OR REPLACE FUNCTION soft_delete_treatment_scheduling()
RETURNS TRIGGER AS $$
BEGIN
-- Atualiza os agendamentos para 'CANCELLED' onde o 'serviceId' 
  UPDATE "Scheduling"
  SET "status" = 'CANCELLED'
  WHERE "serviceId" = NEW.id
    AND "status" = 'SCHEDULED';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger que chama a função de soft delete para os agendamentos de um tratamento desativado
CREATE TRIGGER soft_delete_treatment_scheduling_trigger
AFTER UPDATE ON "Treatment"
FOR EACH ROW

WHEN (NEW."status" = 'INACTIVE' AND OLD."status" <> 'INACTIVE')
EXECUTE FUNCTION soft_delete_treatment_scheduling();


-- Função para cancelar os agendamentos associados a um cliente
CREATE OR REPLACE FUNCTION soft_delete_client_scheduling()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza os agendamentos para 'CANCELLED' onde o 'clientId' está associado a um cliente com status 'INACTIVE'
  UPDATE "Scheduling"
  SET "status" = 'CANCELLED'
  WHERE "clientId" = NEW.id
    AND "status" = 'SCHEDULED';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger que chama a função de cancelamento de agendamentos quando o status de um cliente for alterado para 'INACTIVE'
CREATE TRIGGER soft_delete_client_scheduling_trigger
AFTER UPDATE ON "Client"
FOR EACH ROW
WHEN (NEW."status" = 'INACTIVE' AND OLD."status" <> 'INACTIVE')
EXECUTE FUNCTION soft_delete_client_scheduling();