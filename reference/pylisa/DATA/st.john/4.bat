Note: st.john/4.sym  The whole kit & kaboodle
Note: this file does ssl and schema induction and LISA
Note: figures out for itself whether to license SSL

* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 1 of 2 of st.john/4
* * * * * * * * * * * * * * * * * * * * * * * * * * * 


* * * * * * * * * * * * * * * * * * * * *
Parameters values:
    Neurally-plausible WM
    Semantic Noise = 0.0000
    Semantic Death = 0.0000
    Attention = 1.0000
    Within-group support = 1.0000
    Driver Inhibition = 1.0000
    Recip Inhibition = 1.0000
    Hebb Learning Rate = 1.0000
    Bail Upon Settling = False
    Using Vers142 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Target-Joan    Recip : Source-Bill    Fire control:props    Phase set: P1
Seq. 1    Driver:Target-Joan    Recip : Source-Bill    Fire control:props    Phase set: P2
Seq. 2    Driver:Target-Joan    Recip : Source-Bill    Fire control:props    Phase set: P3
Seq. 3    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P1
Seq. 4    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P2
Seq. 5    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P3
Seq. 6    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P4
Seq. 7    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P5


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Target-Joan to Source-Bill:
  Groups:
  Props:
    From P1 to:    P1 = 0.990
    From P2 to:    P2 = 0.982
    From P3 to:    P3 = 0.982
    From "P4" to:    P4 = 0.982
    From "P5" to:    P5 = 0.990
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From SP3.1 to:    SP3.1 = 0.993
    From SP3.2 to:    SP3.2 = 0.992
    From "SP4.3" to:    SP4.3 = 0.992
    From "SP4.2" to:    SP4.2 = 0.992
    From "SP4.1" to:    SP4.1 = 0.992
    From "SP5.1" to:    SP5.1 = 0.992
    From "SP5.2" to:    SP5.2 = 0.992
  Preds:
    From HAS1 to:    HAS1 = 0.968
    From HAS2 to:    HAS2 = 0.968
    From GOTO1 to:    GOTO1 = 0.968
    From GOTO2 to:    GOTO2 = 0.968
    From WANT1 to:    WANT1 = 0.968
    From WANT2 to:    WANT2 = 0.968
    From "DRIVETO3" to:    DRIVETO3 = 0.968
    From "DRIVETO2" to:    DRIVETO2 = 0.968
    From "DRIVETO1" to:    DRIVETO1 = 0.968
    From "CAUSE1" to:    CAUSE1 = 0.969
    From "CAUSE2" to:    CAUSE2 = 0.969
  Objs:
    From JOAN to:    BILL = 0.970
    From CIVIC to:    JEEP = 0.968
    From LAX to:    BEACH = 0.968

From Target-Joan to Schema:
  Groups:
  Props:
    From P1 to:
    From P2 to:
    From P3 to:
    From "P4" to:
    From "P5" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From SP3.1 to:
    From SP3.2 to:
    From "SP4.3" to:
    From "SP4.2" to:
    From "SP4.1" to:
    From "SP5.1" to:
    From "SP5.2" to:
  Preds:
    From HAS1 to:
    From HAS2 to:
    From GOTO1 to:
    From GOTO2 to:
    From WANT1 to:
    From WANT2 to:
    From "DRIVETO3" to:
    From "DRIVETO2" to:
    From "DRIVETO1" to:
    From "CAUSE1" to:
    From "CAUSE2" to:
  Objs:
    From JOAN to:
    From CIVIC to:
    From LAX to:

From Source-Bill to Target-Joan:
  Groups:
  Props:
    From P1 to:    P1 = 0.990
    From P2 to:    P2 = 0.982
    From P3 to:    P3 = 0.982
    From P4 to:    "P4" = 0.982
    From P5 to:    "P5" = 0.990
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From SP3.1 to:    SP3.1 = 0.993
    From SP3.2 to:    SP3.2 = 0.992
    From SP4.1 to:    "SP4.1" = 0.992
    From SP4.2 to:    "SP4.2" = 0.992
    From SP4.3 to:    "SP4.3" = 0.992
    From SP5.1 to:    "SP5.1" = 0.992
    From SP5.2 to:    "SP5.2" = 0.992
  Preds:
    From HAS1 to:    HAS1 = 0.968
    From HAS2 to:    HAS2 = 0.968
    From GOTO1 to:    GOTO1 = 0.968
    From GOTO2 to:    GOTO2 = 0.968
    From WANT1 to:    WANT1 = 0.968
    From WANT2 to:    WANT2 = 0.968
    From DRIVETO1 to:    "DRIVETO1" = 0.968
    From DRIVETO2 to:    "DRIVETO2" = 0.968
    From DRIVETO3 to:    "DRIVETO3" = 0.968
    From CAUSE1 to:    "CAUSE1" = 0.969
    From CAUSE2 to:    "CAUSE2" = 0.969
  Objs:
    From BILL to:    JOAN = 0.970
    From JEEP to:    CIVIC = 0.968
    From BEACH to:    LAX = 0.968

From Source-Bill to Schema:
  Groups:
  Props:
    From P1 to:    "P1" = 0.990
    From P2 to:    "P2" = 0.982
    From P3 to:    "P3" = 0.982
    From P4 to:    "P4" = 0.982
    From P5 to:    "P5" = 0.990
  SPs:
    From SP1.1 to:    "SP1.1" = 0.993
    From SP1.2 to:    "SP1.2" = 0.993
    From SP2.1 to:    "SP2.1" = 0.990
    From SP2.2 to:    "SP2.2" = 0.993
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.992
    From SP4.1 to:    "SP4.1" = 0.992
    From SP4.2 to:    "SP4.2" = 0.992
    From SP4.3 to:    "SP4.3" = 0.992
    From SP5.1 to:    "SP5.1" = 0.992
    From SP5.2 to:    "SP5.2" = 0.992
  Preds:
    From HAS1 to:    "HAS1" = 0.970
    From HAS2 to:    "HAS2" = 0.970
    From GOTO1 to:    "GOTO1" = 0.969
    From GOTO2 to:    "GOTO2" = 0.970
    From WANT1 to:    "WANT1" = 0.969
    From WANT2 to:    "WANT2" = 0.970
    From DRIVETO1 to:    "DRIVETO1" = 0.968
    From DRIVETO2 to:    "DRIVETO2" = 0.968
    From DRIVETO3 to:    "DRIVETO3" = 0.968
    From CAUSE1 to:    "CAUSE1" = 0.969
    From CAUSE2 to:    "CAUSE2" = 0.969
  Objs:
    From BILL to:    "BILL" = 0.970
    From JEEP to:    "JEEP" = 0.970
    From BEACH to:    "BEACH" = 0.970

From Schema to Target-Joan:
  Groups:
  Props:
    From "P1" to:
    From "P2" to:
    From "P3" to:
    From "P4" to:
    From "P5" to:
  SPs:
    From "SP1.2" to:
    From "SP1.1" to:
    From "SP2.1" to:
    From "SP2.2" to:
    From "SP3.2" to:
    From "SP3.1" to:
    From "SP4.3" to:
    From "SP4.2" to:
    From "SP4.1" to:
    From "SP5.1" to:
    From "SP5.2" to:
  Preds:
    From "HAS2" to:
    From "HAS1" to:
    From "GOTO1" to:
    From "GOTO2" to:
    From "WANT2" to:
    From "WANT1" to:
    From "DRIVETO3" to:
    From "DRIVETO2" to:
    From "DRIVETO1" to:
    From "CAUSE1" to:
    From "CAUSE2" to:
  Objs:
    From "JEEP" to:
    From "BILL" to:
    From "BEACH" to:

From Schema to Source-Bill:
  Groups:
  Props:
    From "P1" to:    P1 = 0.990
    From "P2" to:    P2 = 0.982
    From "P3" to:    P3 = 0.982
    From "P4" to:    P4 = 0.982
    From "P5" to:    P5 = 0.990
  SPs:
    From "SP1.2" to:    SP1.2 = 0.993
    From "SP1.1" to:    SP1.1 = 0.993
    From "SP2.1" to:    SP2.1 = 0.990
    From "SP2.2" to:    SP2.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.992
    From "SP3.1" to:    SP3.1 = 0.990
    From "SP4.3" to:    SP4.3 = 0.992
    From "SP4.2" to:    SP4.2 = 0.992
    From "SP4.1" to:    SP4.1 = 0.992
    From "SP5.1" to:    SP5.1 = 0.992
    From "SP5.2" to:    SP5.2 = 0.992
  Preds:
    From "HAS2" to:    HAS2 = 0.970
    From "HAS1" to:    HAS1 = 0.970
    From "GOTO1" to:    GOTO1 = 0.969
    From "GOTO2" to:    GOTO2 = 0.970
    From "WANT2" to:    WANT2 = 0.970
    From "WANT1" to:    WANT1 = 0.969
    From "DRIVETO3" to:    DRIVETO3 = 0.968
    From "DRIVETO2" to:    DRIVETO2 = 0.968
    From "DRIVETO1" to:    DRIVETO1 = 0.968
    From "CAUSE1" to:    CAUSE1 = 0.969
    From "CAUSE2" to:    CAUSE2 = 0.969
  Objs:
    From "JEEP" to:    JEEP = 0.970
    From "BILL" to:    BILL = 0.970
    From "BEACH" to:    BEACH = 0.970



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Target-Joan * * * * *

Groups:

Props:
"P4":  [ "DRIVETO3" + LAX ] [ "DRIVETO2" + CIVIC ] [ "DRIVETO1" + JOAN ] 
"P5":  [ "CAUSE1" + P3 ] [ "CAUSE2" + "P4" ] 

Preds:
"DRIVETO3":
   PTRANS3(1.000)
   GOTO3(1.000)
   DRIVE3(1.000)
   VEHICLE3(1.000)
   DRIVE23(1.000)
   DRIVE33(1.000)

"DRIVETO2":
   PTRANS2(1.000)
   GOTO2(1.000)
   DRIVE2(1.000)
   VEHICLE2(1.000)
   DRIVE22(1.000)
   DRIVE32(1.000)

"DRIVETO1":
   PTRANS1(1.000)
   GOTO1(1.000)
   DRIVE1(1.000)
   VEHICLE1(1.000)
   DRIVE21(1.000)
   DRIVE31(1.000)

"CAUSE1":
   CAUSE1(1.000)
   CAUSE21(1.000)
   CAUSE31(1.000)
   CAUSE41(1.000)

"CAUSE2":
   CAUSE2(1.000)
   CAUSE22(1.000)
   CAUSE32(1.000)
   CAUSE42(1.000)


Objs:

* * * * * Analog Source-Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Schema * * * * *

Groups:

Props:
"P1":  [ "HAS2" + "JEEP" ] [ "HAS1" + "BILL" ] 
"P2":  [ "GOTO1" + "BILL" ] [ "GOTO2" + "BEACH" ] 
"P3":  [ "WANT2" + "P2" ] [ "WANT1" + "BILL" ] 
"P4":  [ "DRIVETO3" + "BEACH" ] [ "DRIVETO2" + "JEEP" ] [ "DRIVETO1" + "BILL" ] 
"P5":  [ "CAUSE1" + "P3" ] [ "CAUSE2" + "P4" ] 

Preds:
"HAS2":
   STATE2(1.000)
   HAS12(1.000)
   HAS22(1.000)
   HAS32(1.000)

"HAS1":
   STATE1(1.000)
   HAS11(1.000)
   HAS21(1.000)
   HAS31(1.000)

"GOTO1":
   PTRANS1(1.000)
   GOTO11(1.000)
   GOTO21(1.000)
   GOTO31(1.000)

"GOTO2":
   PTRANS2(1.000)
   GOTO12(1.000)
   GOTO22(1.000)
   GOTO32(1.000)

"WANT2":
   STATE2(1.000)
   WANT2(1.000)
   12(1.000)
   WANT22(1.000)
   WANT32(1.000)

"WANT1":
   STATE1(1.000)
   WANT1(1.000)
   11(1.000)
   WANT21(1.000)
   WANT31(1.000)

"DRIVETO3":
   PTRANS3(1.000)
   GOTO3(1.000)
   DRIVE3(1.000)
   VEHICLE3(1.000)
   DRIVE23(1.000)
   DRIVE33(1.000)

"DRIVETO2":
   PTRANS2(1.000)
   GOTO2(1.000)
   DRIVE2(1.000)
   VEHICLE2(1.000)
   DRIVE22(1.000)
   DRIVE32(1.000)

"DRIVETO1":
   PTRANS1(1.000)
   GOTO1(1.000)
   DRIVE1(1.000)
   VEHICLE1(1.000)
   DRIVE21(1.000)
   DRIVE31(1.000)

"CAUSE1":
   CAUSE1(1.000)
   CAUSE21(1.000)
   CAUSE31(1.000)
   CAUSE41(1.000)

"CAUSE2":
   CAUSE2(1.000)
   CAUSE22(1.000)
   CAUSE32(1.000)
   CAUSE42(1.000)


Objs:
"JEEP":
    ARTIFACT(0.868)
    VEHICLE(0.868)
    CAR(0.868)
   CIVIC(1.000)
        JAPANESE(0.500)
        GOOD(0.500)
      JEEP(0.737)
         AMERICAN(0.368)
         SHIT(0.368)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
       JOAN1(0.593)
       JOAN2(0.593)
       JOAN3(0.593)
         MALE(0.429)
         BILL1(0.429)
         BILL2(0.429)
         BILL3(0.429)

"BEACH":
    LOCATION(0.874)
   AIRPORT(1.000)
    COMMERCE(0.874)
        TRANSPORT(0.500)
        FLIGHT(0.500)
      BEACH(0.749)
         RECREATION(0.374)
         OCEAN(0.374)
         SAND(0.374)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 2 of 2 of st.john/4
* * * * * * * * * * * * * * * * * * * * * * * * * * * 


* * * * * * * * * * * * * * * * * * * * *
Parameters values:
    Neurally-plausible WM
    Semantic Noise = 0.0000
    Semantic Death = 0.0000
    Attention = 1.0000
    Within-group support = 1.0000
    Driver Inhibition = 1.0000
    Recip Inhibition = 1.0000
    Hebb Learning Rate = 1.0000
    Bail Upon Settling = False
    Using Vers142 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Target-Joan    Recip : Source-Bill    Fire control:props    Phase set: P1
Seq. 1    Driver:Target-Joan    Recip : Source-Bill    Fire control:props    Phase set: P2
Seq. 2    Driver:Target-Joan    Recip : Source-Bill    Fire control:props    Phase set: P3
Seq. 3    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P1
Seq. 4    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P2
Seq. 5    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P3
Seq. 6    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P4
Seq. 7    Driver:Source-Bill    Recip : Target-Joan Schema    Fire control:props    Phase set: P5


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Target-Joan to Source-Bill:
  Groups:
  Props:
    From P1 to:
    From P2 to:
    From P3 to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From SP3.1 to:
    From SP3.2 to:
  Preds:
    From HAS1 to:
    From HAS2 to:
    From GOTO1 to:
    From GOTO2 to:
    From WANT1 to:
    From WANT2 to:
  Objs:
    From JOAN to:
    From CIVIC to:
    From LAX to:

From Target-Joan to Schema:
  Groups:
  Props:
    From P1 to:
    From P2 to:
    From P3 to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From SP3.1 to:
    From SP3.2 to:
  Preds:
    From HAS1 to:
    From HAS2 to:
    From GOTO1 to:
    From GOTO2 to:
    From WANT1 to:
    From WANT2 to:
  Objs:
    From JOAN to:
    From CIVIC to:
    From LAX to:

From Source-Bill to Target-Joan:
  Groups:
  Props:
    From P1 to:
    From P2 to:
    From P3 to:
    From P4 to:
    From P5 to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From SP3.1 to:
    From SP3.2 to:
    From SP4.1 to:
    From SP4.2 to:
    From SP4.3 to:
    From SP5.1 to:
    From SP5.2 to:
  Preds:
    From HAS1 to:
    From HAS2 to:
    From GOTO1 to:
    From GOTO2 to:
    From WANT1 to:
    From WANT2 to:
    From DRIVETO1 to:
    From DRIVETO2 to:
    From DRIVETO3 to:
    From CAUSE1 to:
    From CAUSE2 to:
  Objs:
    From BILL to:
    From JEEP to:
    From BEACH to:

From Source-Bill to Schema:
  Groups:
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
    From P4 to:    "P4" = 1.000
    From P5 to:    "P5" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
    From SP4.1 to:    "SP4.1" = 1.000
    From SP4.2 to:    "SP4.2" = 1.000
    From SP4.3 to:    "SP4.3" = 1.000
    From SP5.1 to:    "SP5.1" = 1.000
    From SP5.2 to:    "SP5.2" = 1.000
  Preds:
    From HAS1 to:    "HAS1" = 1.000
    From HAS2 to:    "HAS2" = 1.000
    From GOTO1 to:    "GOTO1" = 1.000
    From GOTO2 to:    "GOTO2" = 1.000
    From WANT1 to:    "WANT1" = 1.000
    From WANT2 to:    "WANT2" = 1.000
    From DRIVETO1 to:    "DRIVETO1" = 1.000
    From DRIVETO2 to:    "DRIVETO2" = 1.000
    From DRIVETO3 to:    "DRIVETO3" = 1.000
    From CAUSE1 to:    "CAUSE1" = 1.000
    From CAUSE2 to:    "CAUSE2" = 1.000
  Objs:
    From BILL to:    "BILL" = 1.000
    From JEEP to:    "JEEP" = 1.000
    From BEACH to:    "BEACH" = 1.000

From Schema to Target-Joan:
  Groups:
  Props:
    From "P1" to:
    From "P2" to:
    From "P3" to:
    From "P4" to:
    From "P5" to:
  SPs:
    From "SP1.2" to:
    From "SP1.1" to:
    From "SP2.2" to:
    From "SP2.1" to:
    From "SP3.1" to:
    From "SP3.2" to:
    From "SP4.3" to:
    From "SP4.2" to:
    From "SP4.1" to:
    From "SP5.1" to:
    From "SP5.2" to:
  Preds:
    From "HAS2" to:
    From "HAS1" to:
    From "GOTO2" to:
    From "GOTO1" to:
    From "WANT1" to:
    From "WANT2" to:
    From "DRIVETO3" to:
    From "DRIVETO2" to:
    From "DRIVETO1" to:
    From "CAUSE1" to:
    From "CAUSE2" to:
  Objs:
    From "JEEP" to:
    From "BILL" to:
    From "BEACH" to:

From Schema to Source-Bill:
  Groups:
  Props:
    From "P1" to:    P1 = 1.000
    From "P2" to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
    From "P4" to:    P4 = 1.000
    From "P5" to:    P5 = 1.000
  SPs:
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP4.3" to:    SP4.3 = 1.000
    From "SP4.2" to:    SP4.2 = 1.000
    From "SP4.1" to:    SP4.1 = 1.000
    From "SP5.1" to:    SP5.1 = 1.000
    From "SP5.2" to:    SP5.2 = 1.000
  Preds:
    From "HAS2" to:    HAS2 = 1.000
    From "HAS1" to:    HAS1 = 1.000
    From "GOTO2" to:    GOTO2 = 1.000
    From "GOTO1" to:    GOTO1 = 1.000
    From "WANT1" to:    WANT1 = 1.000
    From "WANT2" to:    WANT2 = 1.000
    From "DRIVETO3" to:    DRIVETO3 = 1.000
    From "DRIVETO2" to:    DRIVETO2 = 1.000
    From "DRIVETO1" to:    DRIVETO1 = 1.000
    From "CAUSE1" to:    CAUSE1 = 1.000
    From "CAUSE2" to:    CAUSE2 = 1.000
  Objs:
    From "JEEP" to:    JEEP = 1.000
    From "BILL" to:    BILL = 1.000
    From "BEACH" to:    BEACH = 1.000



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Target-Joan * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Source-Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Schema * * * * *

Groups:

Props:
"P1":  [ "HAS2" + "JEEP" ] [ "HAS1" + "BILL" ] 
"P2":  [ "GOTO2" + "BEACH" ] [ "GOTO1" + "BILL" ] 
"P3":  [ "WANT1" + "BILL" ] [ "WANT2" + "P2" ] 
"P4":  [ "DRIVETO3" + "BEACH" ] [ "DRIVETO2" + "JEEP" ] [ "DRIVETO1" + "BILL" ] 
"P5":  [ "CAUSE1" + "P3" ] [ "CAUSE2" + "P4" ] 

Preds:
"HAS2":
   STATE2(1.000)
     HAS12(0.840)
     HAS22(0.840)
     HAS32(0.840)
           WANT2(0.182)
           12(0.182)
           WANT22(0.182)
           WANT32(0.182)

"HAS1":
   STATE1(1.000)
     HAS11(0.839)
     HAS21(0.839)
     HAS31(0.839)
           WANT1(0.193)
           11(0.193)
           WANT21(0.193)
           WANT31(0.193)

"GOTO2":
   PTRANS2(1.000)
   GOTO12(1.000)
   GOTO22(1.000)
   GOTO32(1.000)

"GOTO1":
   PTRANS1(1.000)
   GOTO11(1.000)
   GOTO21(1.000)
   GOTO31(1.000)

"WANT1":
   STATE1(1.000)
           HAS11(0.183)
           HAS21(0.183)
           HAS31(0.183)
     WANT1(0.844)
     11(0.844)
     WANT21(0.844)
     WANT31(0.844)

"WANT2":
   STATE2(1.000)
           HAS12(0.180)
           HAS22(0.180)
           HAS32(0.180)
     WANT2(0.844)
     12(0.844)
     WANT22(0.844)
     WANT32(0.844)

"DRIVETO3":
   PTRANS2(1.000)
   GOTO12(1.000)
   GOTO22(1.000)
   GOTO32(1.000)
   PTRANS3(1.000)
   GOTO3(1.000)
   DRIVE3(1.000)
   VEHICLE3(1.000)
   DRIVE23(1.000)
   DRIVE33(1.000)

"DRIVETO2":
   PTRANS2(1.000)
        GOTO12(0.541)
        GOTO22(0.541)
        GOTO32(0.541)
       GOTO2(0.577)
       DRIVE2(0.577)
       VEHICLE2(0.577)
       DRIVE22(0.577)
       DRIVE32(0.577)

"DRIVETO1":
   PTRANS1(1.000)
        GOTO11(0.544)
        GOTO21(0.544)
        GOTO31(0.544)
       GOTO1(0.568)
       DRIVE1(0.568)
       VEHICLE1(0.568)
       DRIVE21(0.568)
       DRIVE31(0.568)

"CAUSE1":
   CAUSE1(1.000)
   CAUSE21(1.000)
   CAUSE31(1.000)
   CAUSE41(1.000)

"CAUSE2":
   CAUSE2(1.000)
   CAUSE22(1.000)
   CAUSE32(1.000)
   CAUSE42(1.000)


Objs:
"JEEP":
   ARTIFACT(0.999)
   VEHICLE(0.999)
   CAR(0.999)
   CIVIC(1.000)
        JAPANESE(0.500)
        GOOD(0.500)
   JEEP(1.000)
        AMERICAN(0.500)
        SHIT(0.500)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.523)
        JOAN1(0.523)
        JOAN2(0.523)
        JOAN3(0.523)
       MALE(0.630)
       BILL1(0.630)
       BILL2(0.630)
       BILL3(0.630)

"BEACH":
   LOCATION(0.997)
   AIRPORT(1.000)
   COMMERCE(0.997)
        TRANSPORT(0.500)
        FLIGHT(0.500)
   BEACH(1.000)
        RECREATION(0.500)
        OCEAN(0.500)
        SAND(0.500)

