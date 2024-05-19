import { Value } from "@radix-ui/react-select"

export enum ContractTypeEnum {
  TimeAndMaterial = 1,  // "準委任契約", 
  PowerOfAttorney = 2,  // "委任契約", 
  Work = 3,             // "請負契約", 
  Dispatched = 4,       // "派遣契約"
}

export const ContractTypeOptions: Array<{ value: ContractTypeEnum, label: string }> = [
  { value: ContractTypeEnum.TimeAndMaterial,  label: "準委任契約" }, 
  { value: ContractTypeEnum.PowerOfAttorney,  label: "委任契約" },  
  { value: ContractTypeEnum.Work,             label: "請負契約" }, 
  { value: ContractTypeEnum.Dispatched,       label: "派遣契約" }, 
]

export const GetContractTypeText = (contractTypeValue: ContractTypeEnum) => {
  const finded = ContractTypeOptions.find((x) => x.value == contractTypeValue)
  return finded ? (finded as { value: ContractTypeEnum, label: string }).label : ""
}