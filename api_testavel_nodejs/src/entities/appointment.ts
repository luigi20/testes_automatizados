import { randomUUID } from 'crypto';

interface AppointmentProps{
   customer:string;
   startsAt:Date;
   endAt:Date;
}

export class Appointment{
 private props: AppointmentProps;
 private _id:string;

 constructor( props: AppointmentProps,id?:string){
  const {startsAt, endAt} = props;
  if(endAt <= startsAt){
    throw new Error('End date must be after start date');
  }
  if(startsAt <= new Date()){
    throw new Error('Start date must in today');
  }
  this._id = id?? randomUUID();
   this.props = {
    ...props
   };
 }

 public get id(): string{
   return this._id;
 }

 public get customer(): string{
   return this.props.customer;
 }

 public get startsAt(): Date{
   return this.props.startsAt;
 }

 public get endAt(): Date{
   return this.props.endAt;
 }

}