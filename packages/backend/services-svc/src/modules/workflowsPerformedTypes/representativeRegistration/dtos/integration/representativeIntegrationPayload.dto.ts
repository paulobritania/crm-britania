/* eslint-disable camelcase */
/* eslint-disable max-classes-per-file */
class Representative {
  cod_tip_repres: string

  v_ind_pessoa: string

  nom_pessoa: string

  cod_pais: string

  cod_id_feder: string

  nom_abrev: string

  cod_grp_repres: string

  dat_impl_repres: string

  val_perc_comis_repres: number

  val_perc_comis_repres_emis: number

  val_perc_comis_min: number

  val_perc_comis_max: number

  cod_unid_negoc: string

  cod_calend_comis: string

  'cod-formula': string
}

export class RepresentativeIntegrationPayloadDto {
  representante: Representative
}
