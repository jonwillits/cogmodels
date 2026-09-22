Note: LoveTri8.sym
Note: This version uses hierarchical group-based fire control during SSL
Note: Whole thing: Inference schema induction, LISA-guided initiation fo SSL

* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 1 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

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
    From G1 to:    G1 = 0.952    "G3" = 0.082
    From G2 to:    "G2" = 0.998
    From G3 to:    "G3" = 0.988
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    ABE = 1.000
    From BILL to:    BETH = 1.000
    From CAT to:    CHAD = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.999
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.985
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.952
    From "G3" to:    G3 = 0.988    G1 = 0.082
    From "G2" to:    G2 = 0.998
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    AMY = 1.000
    From BETH to:    BILL = 1.000
    From CHAD to:    CAT = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.999
    From "G3" to:    G3 = 0.985
    From "G2" to:    G2 = 0.997
  Props:
    From "P1" to:    P1 = 1.000
    From "P2" to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From "LOVES1" to:    LOVES1 = 1.000
    From "LOVES2" to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From "AMY" to:    AMY = 1.000
    From "BILL" to:    BILL = 1.000
    From "CAT" to:    CAT = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P1" to:
    From "P2" to:
    From "P3" to:
  SPs:
    From "SP1.1" to:
    From "SP1.2" to:
    From "SP2.2" to:
    From "SP2.1" to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From "LOVES1" to:
    From "LOVES2" to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From "AMY" to:
    From "BILL" to:
    From "CAT" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS1" + ABE ] [ "JEALOUS2" + CHAD ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P1" "P2" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 

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

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:
"AMY":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
         AMY(0.414)
       MALE(0.593)
       ABE(0.593)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
         MALE(0.414)
         BILL(0.414)
       BETH(0.593)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
       MALE(0.593)
         CAT(0.414)
       CHAD(0.593)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 2 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.931    "G3" = 0.120
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    ABE = 1.000
    From BILL to:    BETH = 1.000
    From CAT to:    CHAD = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.999    "G3" = 0.004
    From G2 to:    "G2" = 0.996
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.931
    From "G3" to:    G3 = 0.984    G1 = 0.120
    From "G2" to:    G2 = 0.997
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    AMY = 1.000
    From BETH to:    BILL = 1.000
    From CHAD to:    CAT = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.999
    From "G3" to:    G3 = 0.984    G1 = 0.004
    From "G2" to:    G2 = 0.996
  Props:
    From "P1" to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
    From "P2" to:    P2 = 1.000
  SPs:
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
  Preds:
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From "BILL" to:    BILL = 1.000
    From "AMY" to:    AMY = 1.000
    From "CAT" to:    CAT = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P1" to:
    From "P3" to:
    From "P2" to:
  SPs:
    From "SP1.2" to:
    From "SP1.1" to:
    From "SP3.1" to:
    From "SP3.2" to:
    From "SP2.2" to:
    From "SP2.1" to:
  Preds:
    From "LOVES2" to:
    From "LOVES1" to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From "BILL" to:
    From "AMY" to:
    From "CAT" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS1" + ABE ] [ "JEALOUS2" + CHAD ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P1" "P2" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P1":  [ "LOVES2" + "BILL" ] [ "LOVES1" + "AMY" ] 
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 

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

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:
"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
         MALE(0.414)
         BILL(0.414)
       BETH(0.593)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
         AMY(0.414)
       MALE(0.593)
       ABE(0.593)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.458)
       MALE(0.567)
        CAT(0.458)
       CHAD(0.567)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 3 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.937    "G3" = 0.082
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    ABE = 1.000
    From BILL to:    BETH = 1.000
    From CAT to:    CHAD = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.999
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.985
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.937
    From "G3" to:    G3 = 0.984    G1 = 0.082
    From "G2" to:    G2 = 0.997
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    AMY = 1.000
    From BETH to:    BILL = 1.000
    From CHAD to:    CAT = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.999
    From "G3" to:    G3 = 0.985
    From "G2" to:    G2 = 0.997
  Props:
    From "P2" to:    P2 = 1.000
    From "P1" to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From "CAT" to:    CAT = 1.000
    From "BILL" to:    BILL = 1.000
    From "AMY" to:    AMY = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P2" to:
    From "P1" to:
    From "P3" to:
  SPs:
    From "SP2.2" to:
    From "SP2.1" to:
    From "SP1.1" to:
    From "SP1.2" to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From "LOVES2" to:
    From "LOVES1" to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From "CAT" to:
    From "BILL" to:
    From "AMY" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS1" + ABE ] [ "JEALOUS2" + CHAD ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P2" "P1" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 

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

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:
"CAT":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
       MALE(0.593)
         CAT(0.414)
       CHAD(0.593)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
         MALE(0.414)
         BILL(0.414)
       BETH(0.593)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
         AMY(0.414)
       MALE(0.593)
       ABE(0.593)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 4 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

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
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.943
    From G2 to:    "G3" = 0.000    "G2" = 0.998
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    BETH = 1.000
    From BILL to:    CHAD = 1.000
    From CAT to:    ABE = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.998
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.943
    From "G3" to:    G3 = 0.984    G2 = 0.000
    From "G2" to:    G2 = 0.998
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    CAT = 1.000
    From BETH to:    AMY = 1.000
    From CHAD to:    BILL = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.998
    From "G3" to:    G3 = 0.984
    From "G2" to:    G2 = 0.997
  Props:
    From "P2" to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
    From "P1" to:    P1 = 1.000
  SPs:
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
  Preds:
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From "CAT" to:    CAT = 1.000
    From "BILL" to:    BILL = 1.000
    From "AMY" to:    AMY = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P2" to:
    From "P3" to:
    From "P1" to:
  SPs:
    From "SP2.2" to:
    From "SP2.1" to:
    From "SP3.1" to:
    From "SP3.2" to:
    From "SP1.2" to:
    From "SP1.1" to:
  Preds:
    From "LOVES2" to:
    From "LOVES1" to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From "CAT" to:
    From "BILL" to:
    From "AMY" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS1" + BETH ] [ "JEALOUS2" + ABE ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P2" "P1" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 
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

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:
"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.502)
        MALE(0.513)
        CAT(0.502)
        ABE(0.513)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
   MALE(1.000)
        BILL(0.500)
        CHAD(0.515)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
   FEMALE(1.000)
        AMY(0.454)
       BETH(0.569)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 5 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.933    "G3" = 0.120
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    ABE = 1.000
    From BILL to:    BETH = 1.000
    From CAT to:    CHAD = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.999    "G3" = 0.004
    From G2 to:    "G2" = 0.996
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.933
    From "G3" to:    G3 = 0.984    G1 = 0.120
    From "G2" to:    G2 = 0.997
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
  Objs:
    From ABE to:    AMY = 1.000
    From BETH to:    BILL = 1.000
    From CHAD to:    CAT = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.2" to:
    From "SP3.1" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS2" to:
    From "JEALOUS1" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.999
    From "G3" to:    G3 = 0.984    G1 = 0.004
    From "G2" to:    G2 = 0.996
  Props:
    From "P1" to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
    From "P2" to:    P2 = 1.000
  SPs:
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
  Preds:
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
  Objs:
    From "BILL" to:    BILL = 1.000
    From "AMY" to:    AMY = 1.000
    From "CAT" to:    CAT = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P1" to:
    From "P3" to:
    From "P2" to:
  SPs:
    From "SP1.2" to:
    From "SP1.1" to:
    From "SP3.2" to:
    From "SP3.1" to:
    From "SP2.1" to:
    From "SP2.2" to:
  Preds:
    From "LOVES2" to:
    From "LOVES1" to:
    From "JEALOUS2" to:
    From "JEALOUS1" to:
  Objs:
    From "BILL" to:
    From "AMY" to:
    From "CAT" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

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
"P1":  [ "LOVES2" + "BILL" ] [ "LOVES1" + "AMY" ] 
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 
"P2":  [ "LOVES1" + "BILL" ] [ "LOVES2" + "CAT" ] 

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
"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
         MALE(0.414)
         BILL(0.414)
       BETH(0.593)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
         AMY(0.414)
       MALE(0.593)
       ABE(0.593)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.458)
       MALE(0.567)
        CAT(0.458)
       CHAD(0.567)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 6 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.920
    From G2 to:    "G2" = 0.997    "G3" = 0.001
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    ABE = 1.000
    From BILL to:    BETH = 1.000
    From CAT to:    CHAD = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.997
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.920
    From "G2" to:    G2 = 0.997
    From "G3" to:    G3 = 0.984    G2 = 0.001
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    AMY = 1.000
    From BETH to:    BILL = 1.000
    From CHAD to:    CAT = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G2" to:
    From "G3" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G2" to:    G2 = 0.997
    From "G3" to:    G3 = 0.984
    From "G1" to:    G1 = 0.997
  Props:
    From "P3" to:    P3 = 1.000
    From "P1" to:    P1 = 1.000
    From "P2" to:    P2 = 1.000
  SPs:
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
  Preds:
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
  Objs:
    From "AMY" to:    AMY = 1.000
    From "CAT" to:    CAT = 1.000
    From "BILL" to:    BILL = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G2" to:
    From "G3" to:
    From "G1" to:
  Props:
    From "P3" to:
    From "P1" to:
    From "P2" to:
  SPs:
    From "SP3.1" to:
    From "SP3.2" to:
    From "SP1.2" to:
    From "SP1.1" to:
    From "SP2.2" to:
    From "SP2.1" to:
  Preds:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
    From "LOVES2" to:
    From "LOVES1" to:
  Objs:
    From "AMY" to:
    From "CAT" to:
    From "BILL" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" G1 CAUSE-RELATION (0.869) 

Props:
"P3":  [ "JEALOUS1" + ABE ] [ "JEALOUS2" + CHAD ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" "G1" CAUSE-RELATION (0.869) 
"G1":  "P1" "P2" CAUSE (0.902) 

Props:
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 
"P1":  [ "LOVES2" + "BILL" ] [ "LOVES1" + "AMY" ] 
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

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


Objs:
"AMY":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.458)
        AMY(0.458)
       MALE(0.567)
       ABE(0.567)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.458)
       MALE(0.567)
        CAT(0.458)
       CHAD(0.567)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
         MALE(0.414)
         BILL(0.414)
       BETH(0.593)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 7 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

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
    From G1 to:    G1 = 0.931    "G3" = 0.120
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    BETH = 1.000
    From BILL to:    ABE = 0.900    CHAD = 1.000
    From CAT to:    BETH = 0.900

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.999    "G3" = 0.004
    From G2 to:    "G2" = 0.996
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.931
    From "G3" to:    G3 = 0.984    G1 = 0.120
    From "G2" to:    G2 = 0.997
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
  Objs:
    From ABE to:    BILL = 0.900
    From BETH to:    AMY = 1.000    CAT = 0.900
    From CHAD to:    BILL = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.2" to:
    From "SP3.1" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS2" to:
    From "JEALOUS1" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.999
    From "G3" to:    G3 = 0.984    G1 = 0.004
    From "G2" to:    G2 = 0.996
  Props:
    From "P2" to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
    From "P1" to:    P1 = 1.000
  SPs:
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
  Preds:
    From "LOVES1" to:    LOVES1 = 1.000
    From "LOVES2" to:    LOVES2 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
  Objs:
    From "BILL" to:    BILL = 1.000
    From "CAT" to:    CAT = 1.000
    From "AMY" to:    AMY = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P2" to:
    From "P3" to:
    From "P1" to:
  SPs:
    From "SP2.1" to:
    From "SP2.2" to:
    From "SP3.2" to:
    From "SP3.1" to:
    From "SP1.1" to:
    From "SP1.2" to:
  Preds:
    From "LOVES1" to:
    From "LOVES2" to:
    From "JEALOUS2" to:
    From "JEALOUS1" to:
  Objs:
    From "BILL" to:
    From "CAT" to:
    From "AMY" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS2" + BETH ] [ "JEALOUS1" + BETH ] 

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
"P3":  [ "JEALOUS2" + "CAT" ] [ "JEALOUS1" + "AMY" ] 
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 

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
   MALE(1.000)
          BILL(0.312)
         ABE(0.385)
          CHAD(0.321)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
   FEMALE(1.000)
         CAT(0.420)
       BETH(0.587)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
   FEMALE(1.000)
        AMY(0.463)
       BETH(0.559)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 8 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

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
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.919    "G3" = 0.041
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    BETH = 1.000
    From BILL to:    CHAD = 1.000
    From CAT to:    ABE = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.998
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.919
    From "G2" to:    G2 = 0.997
    From "G3" to:    G3 = 0.984    G1 = 0.041
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    CAT = 1.000
    From BETH to:    AMY = 1.000
    From CHAD to:    BILL = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G2" to:
    From "G3" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G2" to:    G2 = 0.997
    From "G3" to:    G3 = 0.984
    From "G1" to:    G1 = 0.998
  Props:
    From "P3" to:    P3 = 1.000
    From "P1" to:    P1 = 1.000
    From "P2" to:    P2 = 1.000
  SPs:
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
  Preds:
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
  Objs:
    From "AMY" to:    AMY = 1.000
    From "CAT" to:    CAT = 1.000
    From "BILL" to:    BILL = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G2" to:
    From "G3" to:
    From "G1" to:
  Props:
    From "P3" to:
    From "P1" to:
    From "P2" to:
  SPs:
    From "SP3.1" to:
    From "SP3.2" to:
    From "SP1.2" to:
    From "SP1.1" to:
    From "SP2.2" to:
    From "SP2.1" to:
  Preds:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
    From "LOVES2" to:
    From "LOVES1" to:
  Objs:
    From "AMY" to:
    From "CAT" to:
    From "BILL" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" G1 CAUSE-RELATION (0.869) 

Props:
"P3":  [ "JEALOUS1" + BETH ] [ "JEALOUS2" + ABE ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G2":  "P3" EFFECT (0.902) 
"G3":  "G2" "G1" CAUSE-RELATION (0.869) 
"G1":  "P1" "P2" CAUSE (0.902) 

Props:
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 
"P1":  [ "LOVES2" + "BILL" ] [ "LOVES1" + "AMY" ] 
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)

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


Objs:
"AMY":
   HUMAN(1.000)
   ADULT(1.000)
   FEMALE(1.000)
        AMY(0.454)
       BETH(0.569)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.458)
       MALE(0.567)
        CAT(0.458)
       ABE(0.567)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
   MALE(1.000)
         BILL(0.411)
       CHAD(0.596)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 9 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

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
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.941
    From G2 to:    "G3" = 0.000    "G2" = 0.998
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    BETH = 1.000
    From BILL to:    CHAD = 1.000
    From CAT to:    ABE = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.998
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.941
    From "G3" to:    G3 = 0.984    G2 = 0.000
    From "G2" to:    G2 = 0.998
  Props:
    From P1 to:    P2 = 1.000
    From P2 to:    P1 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP2.1 = 1.000
    From SP1.2 to:    SP2.2 = 1.000
    From SP2.1 to:    SP1.1 = 1.000
    From SP2.2 to:    SP1.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From ABE to:    CAT = 1.000
    From BETH to:    AMY = 1.000
    From CHAD to:    BILL = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.1" to:
    From "SP3.2" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.998
    From "G3" to:    G3 = 0.984
    From "G2" to:    G2 = 0.997
  Props:
    From "P2" to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
    From "P1" to:    P1 = 1.000
  SPs:
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
  Preds:
    From "LOVES2" to:    LOVES2 = 1.000
    From "LOVES1" to:    LOVES1 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
  Objs:
    From "CAT" to:    CAT = 1.000
    From "BILL" to:    BILL = 1.000
    From "AMY" to:    AMY = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P2" to:
    From "P3" to:
    From "P1" to:
  SPs:
    From "SP2.2" to:
    From "SP2.1" to:
    From "SP3.1" to:
    From "SP3.2" to:
    From "SP1.1" to:
    From "SP1.2" to:
  Preds:
    From "LOVES2" to:
    From "LOVES1" to:
    From "JEALOUS1" to:
    From "JEALOUS2" to:
  Objs:
    From "CAT" to:
    From "BILL" to:
    From "AMY" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

* * * * * Analog Abe&Beth * * * * *

Groups:
"G3":  G1 "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P3":  [ "JEALOUS1" + BETH ] [ "JEALOUS2" + ABE ] 

Preds:
"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:

* * * * * Analog Schema * * * * *

Groups:
"G1":  "P2" "P1" CAUSE (0.902) 
"G3":  "G1" "G2" CAUSE-RELATION (0.869) 
"G2":  "P3" EFFECT (0.902) 

Props:
"P2":  [ "LOVES2" + "CAT" ] [ "LOVES1" + "BILL" ] 
"P3":  [ "JEALOUS1" + "AMY" ] [ "JEALOUS2" + "CAT" ] 
"P1":  [ "LOVES1" + "AMY" ] [ "LOVES2" + "BILL" ] 

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

"JEALOUS1":
   EMOTION1(1.000)
   STRONG1(1.000)
   NEGATIVE1(1.000)
   JEALOUS1(1.000)

"JEALOUS2":
   EMOTION2(1.000)
   STRONG2(1.000)
   NEGATIVE2(1.000)
   JEALOUS2(1.000)


Objs:
"CAT":
   HUMAN(1.000)
   ADULT(1.000)
        FEMALE(0.502)
        MALE(0.513)
        CAT(0.502)
        ABE(0.513)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
   MALE(1.000)
        BILL(0.500)
        CHAD(0.515)

"AMY":
   HUMAN(1.000)
   ADULT(1.000)
   FEMALE(1.000)
        AMY(0.454)
       BETH(0.569)


* * * * * * * * * * * * * * * * * * * * * * * * * * * 
Batch run 10 of 10 of lovetri/lovetri8
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
    Using H&H 97/03 Mapping Algorithm
* * * * * * * * * * * * * * * * * * * * *

Sequence:
Seq. 0    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1 P2
Seq. 1    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 2    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 3    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P1
Seq. 4    Driver:Abe&Beth    Recip : Amy&Bill    Fire control:props    Phase set: P2
Seq. 5    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1
Seq. 6    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 7    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P3
Seq. 8    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P2
Seq. 9    Driver:Amy&Bill    Recip : Abe&Beth Schema    Fire control:groups    Phase set: P1


* * * * * * * * * * * * * * * *
* * * Mapping Connections * * *
* * * * * * * * * * * * * * * *

From Amy&Bill to Abe&Beth:
  Groups:
    From G1 to:    G1 = 0.934    "G3" = 0.082
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.984
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    ABE = 1.000
    From BILL to:    BETH = 1.000
    From CAT to:    CHAD = 1.000

From Amy&Bill to Schema:
  Groups:
    From G1 to:    "G1" = 0.999
    From G2 to:    "G2" = 0.997
    From G3 to:    "G3" = 0.985
  Props:
    From P1 to:    "P1" = 1.000
    From P2 to:    "P2" = 1.000
    From P3 to:    "P3" = 1.000
  SPs:
    From SP1.1 to:    "SP1.1" = 1.000
    From SP1.2 to:    "SP1.2" = 1.000
    From SP2.1 to:    "SP2.1" = 1.000
    From SP2.2 to:    "SP2.2" = 1.000
    From SP3.1 to:    "SP3.1" = 1.000
    From SP3.2 to:    "SP3.2" = 1.000
  Preds:
    From LOVES1 to:    "LOVES1" = 1.000
    From LOVES2 to:    "LOVES2" = 1.000
    From JEALOUS1 to:    "JEALOUS1" = 1.000
    From JEALOUS2 to:    "JEALOUS2" = 1.000
  Objs:
    From AMY to:    "AMY" = 1.000
    From BILL to:    "BILL" = 1.000
    From CAT to:    "CAT" = 1.000

From Abe&Beth to Amy&Bill:
  Groups:
    From G1 to:    G1 = 0.934
    From "G3" to:    G3 = 0.984    G1 = 0.082
    From "G2" to:    G2 = 0.997
  Props:
    From P1 to:    P1 = 1.000
    From P2 to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From SP1.1 to:    SP1.1 = 1.000
    From SP1.2 to:    SP1.2 = 1.000
    From SP2.1 to:    SP2.1 = 1.000
    From SP2.2 to:    SP2.2 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
  Preds:
    From LOVES1 to:    LOVES1 = 1.000
    From LOVES2 to:    LOVES2 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
  Objs:
    From ABE to:    AMY = 1.000
    From BETH to:    BILL = 1.000
    From CHAD to:    CAT = 1.000

From Abe&Beth to Schema:
  Groups:
    From G1 to:
    From "G3" to:
    From "G2" to:
  Props:
    From P1 to:
    From P2 to:
    From "P3" to:
  SPs:
    From SP1.1 to:
    From SP1.2 to:
    From SP2.1 to:
    From SP2.2 to:
    From "SP3.2" to:
    From "SP3.1" to:
  Preds:
    From LOVES1 to:
    From LOVES2 to:
    From "JEALOUS2" to:
    From "JEALOUS1" to:
  Objs:
    From ABE to:
    From BETH to:
    From CHAD to:

From Schema to Amy&Bill:
  Groups:
    From "G1" to:    G1 = 0.999
    From "G3" to:    G3 = 0.985
    From "G2" to:    G2 = 0.997
  Props:
    From "P1" to:    P1 = 1.000
    From "P2" to:    P2 = 1.000
    From "P3" to:    P3 = 1.000
  SPs:
    From "SP1.1" to:    SP1.1 = 1.000
    From "SP1.2" to:    SP1.2 = 1.000
    From "SP2.1" to:    SP2.1 = 1.000
    From "SP2.2" to:    SP2.2 = 1.000
    From "SP3.2" to:    SP3.2 = 1.000
    From "SP3.1" to:    SP3.1 = 1.000
  Preds:
    From "LOVES1" to:    LOVES1 = 1.000
    From "LOVES2" to:    LOVES2 = 1.000
    From "JEALOUS2" to:    JEALOUS2 = 1.000
    From "JEALOUS1" to:    JEALOUS1 = 1.000
  Objs:
    From "AMY" to:    AMY = 1.000
    From "BILL" to:    BILL = 1.000
    From "CAT" to:    CAT = 1.000

From Schema to Abe&Beth:
  Groups:
    From "G1" to:
    From "G3" to:
    From "G2" to:
  Props:
    From "P1" to:
    From "P2" to:
    From "P3" to:
  SPs:
    From "SP1.1" to:
    From "SP1.2" to:
    From "SP2.1" to:
    From "SP2.2" to:
    From "SP3.2" to:
    From "SP3.1" to:
  Preds:
    From "LOVES1" to:
    From "LOVES2" to:
    From "JEALOUS2" to:
    From "JEALOUS1" to:
  Objs:
    From "AMY" to:
    From "BILL" to:
    From "CAT" to:



* * * * * * * * * * * * * * * *
* * * * Inferred Units  * * * *
* * * * * * * * * * * * * * * *

* * * * * Analog Amy&Bill * * * * *

Groups:

Props:

Preds:

Objs:

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
         FEMALE(0.414)
         AMY(0.414)
       MALE(0.593)
       ABE(0.593)

"BILL":
   HUMAN(1.000)
   ADULT(1.000)
       FEMALE(0.593)
         MALE(0.414)
         BILL(0.414)
       BETH(0.593)

"CAT":
   HUMAN(1.000)
   ADULT(1.000)
         FEMALE(0.414)
       MALE(0.593)
         CAT(0.414)
       CHAD(0.593)

