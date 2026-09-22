Note: LoveTri8.sym
Note: This version uses hierarchical group-based fire control during SSL
Note: Whole thing: Inference schema induction, LISA-guided initiation fo SSL

* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch: 5 runs of lovetri/lovetri8
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


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Run 1 of lovetri/lovetri8
* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.969
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.969
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    ABE = 0.970
    From BILL to:    BETH = 0.970
    From CAT to:    CHAD = 0.970

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.970
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    "P1" = 0.992
    From P2 to:    "P2" = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    "SP1.1" = 0.982
    From SP1.2 to:    "SP1.2" = 0.982
    From SP2.1 to:    "SP2.1" = 0.993
    From SP2.2 to:    "SP2.2" = 0.993
    From SP3.1 to:    "SP3.1" = 0.993
    From SP3.2 to:    "SP3.2" = 0.993
  Preds:
    From LOVES1 to:    "LOVES1" = 0.970
    From LOVES2 to:    "LOVES2" = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.970
    From JEALOUS2 to:    "JEALOUS2" = 0.970
  Objs:
    From AMY to:    "AMY" = 0.970
    From BILL to:    "BILL" = 0.970
    From CAT to:    "CAT" = 0.970

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.969
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.969
  Objs:
    From ABE to:    AMY = 0.970
    From BETH to:    BILL = 0.970
    From CHAD to:    CAT = 0.970

From Schema to Amy&Bill:
  Groups:
    From "G2" to:    G2 = 0.970
    From "G3" to:    G3 = 0.875
    From "G1" to:    G1 = 0.970
  Props:
    From "P3" to:    P3 = 0.992
    From "P2" to:    P2 = 0.992
    From "P1" to:    P1 = 0.992
  SPs:
    From "SP3.2" to:    SP3.2 = 0.993
    From "SP3.1" to:    SP3.1 = 0.993
    From "SP2.1" to:    SP2.1 = 0.993
    From "SP2.2" to:    SP2.2 = 0.993
    From "SP1.2" to:    SP1.2 = 0.982
    From "SP1.1" to:    SP1.1 = 0.982
  Preds:
    From "JEALOUS2" to:    JEALOUS2 = 0.970
    From "JEALOUS1" to:    JEALOUS1 = 0.970
    From "LOVES1" to:    LOVES1 = 0.970
    From "LOVES2" to:    LOVES2 = 0.970
  Objs:
    From "CAT" to:    CAT = 0.970
    From "AMY" to:    AMY = 0.970
    From "BILL" to:    BILL = 0.970



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS2" + CHAD ] [ "JEALOUS1" + ABE ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" "G1" CAUSE-RELATION (0.869) 
"G1":  "P2" "P1" CAUSE (0.902) 

Props:
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 
"P2":  [ "LOVES1" + "BILL" ] [ "LOVES2" + "CAT" ] 
"P1":  [ "LOVES2" + "BILL" ] [ "LOVES1" + "AMY" ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"LOVES1":
   EMOTION1(1.000)
   POSITIVE1(1.000)
   STRONG1(1.000)
   LOVES1(1.000)

"LOVES2":
   EMOTION2(1.000)
   POSITIVE2(1.000)
   STRONG2(1.000)
   LOVES2(1.000)


Objs:
"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.472)
        MALE(0.545)
        CAT(0.472)
        CHAD(0.545)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.472)
        AMY(0.472)
        MALE(0.545)
        ABE(0.545)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.591)
         MALE(0.416)
         BILL(0.416)
       BETH(0.591)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Run 2 of lovetri/lovetri8
* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.969
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.969
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    ABE = 0.970
    From BILL to:    BETH = 0.970
    From CAT to:    CHAD = 0.970

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.970
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    "P1" = 0.992
    From P2 to:    "P2" = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    "SP1.1" = 0.993
    From SP1.2 to:    "SP1.2" = 0.993
    From SP2.1 to:    "SP2.1" = 0.993
    From SP2.2 to:    "SP2.2" = 0.993
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    "LOVES1" = 0.970
    From LOVES2 to:    "LOVES2" = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.969
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    "AMY" = 0.970
    From BILL to:    "BILL" = 0.970
    From CAT to:    "CAT" = 0.970

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.969
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.969
  Objs:
    From ABE to:    AMY = 0.970
    From BETH to:    BILL = 0.970
    From CHAD to:    CAT = 0.970

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.970
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From "P2" to:    P2 = 0.992
    From "P1" to:    P1 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From "SP2.1" to:    SP2.1 = 0.993
    From "SP2.2" to:    SP2.2 = 0.993
    From "SP1.1" to:    SP1.1 = 0.993
    From "SP1.2" to:    SP1.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.990
  Preds:
    From "LOVES1" to:    LOVES1 = 0.970
    From "LOVES2" to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.969
  Objs:
    From "BILL" to:    BILL = 0.970
    From "CAT" to:    CAT = 0.970
    From "AMY" to:    AMY = 0.970



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS2" + CHAD ] [ "JEALOUS1" + ABE ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P2" "P1" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P2":  [ "LOVES1" + "BILL" ] [ "LOVES2" + "CAT" ] 
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 

Preds:
"LOVES1":
   EMOTION1(1.000)
   POSITIVE1(1.000)
   STRONG1(1.000)
   LOVES1(1.000)

"LOVES2":
   EMOTION2(1.000)
   POSITIVE2(1.000)
   STRONG2(1.000)
   LOVES2(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:
"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.591)
         MALE(0.416)
         BILL(0.416)
       BETH(0.591)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.416)
       MALE(0.591)
         CAT(0.416)
       CHAD(0.591)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.416)
         AMY(0.416)
       MALE(0.591)
       ABE(0.591)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Run 3 of lovetri/lovetri8
* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.969
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From SP3.1 to:    "SP3.1" = 0.993
    From SP3.2 to:    "SP3.2" = 0.993
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.970
    From JEALOUS2 to:    "JEALOUS2" = 0.970
  Objs:
    From AMY to:    ABE = 0.970
    From BILL to:    BETH = 0.970
    From CAT to:    CHAD = 0.970

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.970
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    "P1" = 0.992
    From P2 to:    "P2" = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    "SP1.1" = 0.990
    From SP1.2 to:    "SP1.2" = 0.993
    From SP2.1 to:    "SP2.1" = 0.993
    From SP2.2 to:    "SP2.2" = 0.993
    From SP3.1 to:    "SP3.1" = 0.993
    From SP3.2 to:    "SP3.2" = 0.993
  Preds:
    From LOVES1 to:    "LOVES1" = 0.970
    From LOVES2 to:    "LOVES2" = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.970
    From JEALOUS2 to:    "JEALOUS2" = 0.970
  Objs:
    From AMY to:    "AMY" = 0.970
    From BILL to:    "BILL" = 0.970
    From CAT to:    "CAT" = 0.970

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.969
    From "G2" to:    G2 = 0.970
    From "G3" to:    G3 = 0.875
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.993
    From "SP3.1" to:    SP3.1 = 0.993
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.970
    From "JEALOUS1" to:    JEALOUS1 = 0.970
  Objs:
    From ABE to:    AMY = 0.970
    From BETH to:    BILL = 0.970
    From CHAD to:    CAT = 0.970

From Schema to Amy&Bill:
  Groups:
    From "G2" to:    G2 = 0.970
    From "G3" to:    G3 = 0.875
    From "G1" to:    G1 = 0.970
  Props:
    From "P3" to:    P3 = 0.992
    From "P1" to:    P1 = 0.992
    From "P2" to:    P2 = 0.992
  SPs:
    From "SP3.2" to:    SP3.2 = 0.993
    From "SP3.1" to:    SP3.1 = 0.993
    From "SP1.1" to:    SP1.1 = 0.990
    From "SP1.2" to:    SP1.2 = 0.993
    From "SP2.1" to:    SP2.1 = 0.993
    From "SP2.2" to:    SP2.2 = 0.993
  Preds:
    From "JEALOUS2" to:    JEALOUS2 = 0.970
    From "JEALOUS1" to:    JEALOUS1 = 0.970
    From "LOVES1" to:    LOVES1 = 0.970
    From "LOVES2" to:    LOVES2 = 0.970
  Objs:
    From "CAT" to:    CAT = 0.970
    From "AMY" to:    AMY = 0.970
    From "BILL" to:    BILL = 0.970



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Abe&Beth * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" G1 CAUSE-RELATION (0.869) 

Props:
"P3":  [ "JEALOUS2" + CHAD ] [ "JEALOUS1" + ABE ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" "G1" CAUSE-RELATION (0.869) 
"G1":  "P1" "P2" CAUSE (0.902) 

Props:
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 
"P2":  [ "LOVES1" + "BILL" ] [ "LOVES2" + "CAT" ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"LOVES1":
   EMOTION1(1.000)
   POSITIVE1(1.000)
   STRONG1(1.000)
   LOVES1(1.000)

"LOVES2":
   EMOTION2(1.000)
   POSITIVE2(1.000)
   STRONG2(1.000)
   LOVES2(1.000)


Objs:
"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.459)
       MALE(0.565)
        CAT(0.459)
       CHAD(0.565)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.459)
        AMY(0.459)
       MALE(0.566)
       ABE(0.566)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.591)
         MALE(0.416)
         BILL(0.416)
       BETH(0.591)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Run 4 of lovetri/lovetri8
* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.969
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    P2 = 0.992
    From P2 to:    P1 = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    SP2.1 = 0.993
    From SP1.2 to:    SP2.2 = 0.993
    From SP2.1 to:    SP1.1 = 0.990
    From SP2.2 to:    SP1.2 = 0.990
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.969
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    BETH = 0.970
    From BILL to:    CHAD = 0.970
    From CAT to:    ABE = 0.889

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.970
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    "P1" = 0.992
    From P2 to:    "P2" = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    "SP1.1" = 0.993
    From SP1.2 to:    "SP1.2" = 0.993
    From SP2.1 to:    "SP2.1" = 0.993
    From SP2.2 to:    "SP2.2" = 0.993
    From SP3.1 to:    "SP3.1" = 0.993
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    "LOVES1" = 0.970
    From LOVES2 to:    "LOVES2" = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.970
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    "AMY" = 0.970
    From BILL to:    "BILL" = 0.970
    From CAT to:    "CAT" = 0.970

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.969
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From P1 to:    P2 = 0.992
    From P2 to:    P1 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From SP1.1 to:    SP2.1 = 0.990
    From SP1.2 to:    SP2.2 = 0.990
    From SP2.1 to:    SP1.1 = 0.993
    From SP2.2 to:    SP1.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.969
  Objs:
    From ABE to:    CAT = 0.889
    From BETH to:    AMY = 0.970
    From CHAD to:    BILL = 0.970

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.970
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From "P2" to:    P2 = 0.992
    From "P3" to:    P3 = 0.992
    From "P1" to:    P1 = 0.992
  SPs:
    From "SP2.2" to:    SP2.2 = 0.993
    From "SP2.1" to:    SP2.1 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.993
    From "SP1.2" to:    SP1.2 = 0.993
    From "SP1.1" to:    SP1.1 = 0.993
  Preds:
    From "LOVES2" to:    LOVES2 = 0.970
    From "LOVES1" to:    LOVES1 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.970
  Objs:
    From "CAT" to:    CAT = 0.970
    From "BILL" to:    BILL = 0.970
    From "AMY" to:    AMY = 0.970



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS2" + ABE ] [ "JEALOUS1" + BETH ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P2" "P1" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 
"P1":  [ "LOVES2" + "BILL" ] [ "LOVES1" + "AMY" ] 

Preds:
"LOVES2":
   EMOTION2(1.000)
   POSITIVE2(1.000)
   STRONG2(1.000)
   LOVES2(1.000)

"LOVES1":
   EMOTION1(1.000)
   POSITIVE1(1.000)
   STRONG1(1.000)
   LOVES1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:
"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.512)
        MALE(0.502)
        CAT(0.512)
        ABE(0.502)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
   MALE(1.000)
        BILL(0.503)
        CHAD(0.512)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
   FEMALE(1.000)
        AMY(0.456)
       BETH(0.569)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Run 5 of lovetri/lovetri8
* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.969
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.969
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    ABE = 0.970
    From BILL to:    BETH = 0.970
    From CAT to:    CHAD = 0.970

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.970
    From G2 to:    "G2" = 0.970
    From G3 to:    "G3" = 0.875
  Props:
    From P1 to:    "P1" = 0.992
    From P2 to:    "P2" = 0.992
    From P3 to:    "P3" = 0.992
  SPs:
    From SP1.1 to:    "SP1.1" = 0.993
    From SP1.2 to:    "SP1.2" = 0.993
    From SP2.1 to:    "SP2.1" = 0.993
    From SP2.2 to:    "SP2.2" = 0.993
    From SP3.1 to:    "SP3.1" = 0.990
    From SP3.2 to:    "SP3.2" = 0.990
  Preds:
    From LOVES1 to:    "LOVES1" = 0.970
    From LOVES2 to:    "LOVES2" = 0.970
    From JEALOUS1 to:    "JEALOUS1" = 0.969
    From JEALOUS2 to:    "JEALOUS2" = 0.969
  Objs:
    From AMY to:    "AMY" = 0.970
    From BILL to:    "BILL" = 0.970
    From CAT to:    "CAT" = 0.970

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.969
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From P1 to:    P1 = 0.992
    From P2 to:    P2 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From SP1.1 to:    SP1.1 = 0.993
    From SP1.2 to:    SP1.2 = 0.993
    From SP2.1 to:    SP2.1 = 0.993
    From SP2.2 to:    SP2.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.990
  Preds:
    From LOVES1 to:    LOVES1 = 0.970
    From LOVES2 to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.969
  Objs:
    From ABE to:    AMY = 0.970
    From BETH to:    BILL = 0.970
    From CHAD to:    CAT = 0.970

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.970
    From "G3" to:    G3 = 0.875
    From "G2" to:    G2 = 0.970
  Props:
    From "P1" to:    P1 = 0.992
    From "P2" to:    P2 = 0.992
    From "P3" to:    P3 = 0.992
  SPs:
    From "SP1.1" to:    SP1.1 = 0.993
    From "SP1.2" to:    SP1.2 = 0.993
    From "SP2.1" to:    SP2.1 = 0.993
    From "SP2.2" to:    SP2.2 = 0.993
    From "SP3.2" to:    SP3.2 = 0.990
    From "SP3.1" to:    SP3.1 = 0.990
  Preds:
    From "LOVES1" to:    LOVES1 = 0.970
    From "LOVES2" to:    LOVES2 = 0.970
    From "JEALOUS2" to:    JEALOUS2 = 0.969
    From "JEALOUS1" to:    JEALOUS1 = 0.969
  Objs:
    From "AMY" to:    AMY = 0.970
    From "BILL" to:    BILL = 0.970
    From "CAT" to:    CAT = 0.970



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS2" + CHAD ] [ "JEALOUS1" + ABE ] 

Preds:
"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P1" "P2" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 
"P2":  [ "LOVES1" + "BILL" ] [ "LOVES2" + "CAT" ] 
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 

Preds:
"LOVES1":
   EMOTION1(1.000)
   POSITIVE1(1.000)
   STRONG1(1.000)
   LOVES1(1.000)

"LOVES2":
   EMOTION2(1.000)
   POSITIVE2(1.000)
   STRONG2(1.000)
   LOVES2(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)


Objs:
"AMY":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.416)
         AMY(0.416)
       MALE(0.591)
       ABE(0.591)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.591)
         MALE(0.416)
         BILL(0.416)
       BETH(0.591)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.416)
       MALE(0.591)
         CAT(0.416)
       CHAD(0.591)

