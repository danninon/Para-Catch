import {ICatchable} from "../Catchable/ICatchable";

export interface ICatcher {
    catch(catchable: ICatchable ): void;
}